import { useState, useCallback, useMemo } from "react";
import { Chess, Square } from "chess.js";
import { GameState, ChessColor, PieceType } from "../types/chess";

// Convert chess.js piece symbol to our PieceType
const pieceSymbolToType = (symbol: string): PieceType => {
  switch (symbol.toLowerCase()) {
    case "k":
      return "king";
    case "q":
      return "queen";
    case "r":
      return "rook";
    case "b":
      return "bishop";
    case "n":
      return "knight";
    case "p":
      return "pawn";
    default:
      throw new Error(`Unknown piece symbol: ${symbol}`);
  }
};

// Convert square notation (a1, b2, etc.) to array coordinates [row, col]
// const squareToCoord = (square: Square): [number, number] => {
//   const file = square.charCodeAt(0) - 'a'.charCodeAt(0); // a=0, b=1, etc.
//   const rank = parseInt(square[1]) - 1; // 1=0, 2=1, etc.
//   return [7 - rank, file]; // Flip rank for display (8th rank = row 0)
// };

// Convert array coordinates back to square notation
const coordToSquare = (coord: [number, number]): Square => {
  const [row, col] = coord;
  const file = String.fromCharCode("a".charCodeAt(0) + col);
  const rank = (8 - row).toString();
  return (file + rank) as Square;
};

export interface ChessGameHook {
  // Game state
  gameState: GameState;
  pieces: Array<{
    type: PieceType;
    color: ChessColor;
    coord: [number, number];
    square: Square;
  }>;
  capturedPieces: Array<{ type: PieceType; color: ChessColor }>;

  // Actions
  makeMove: (from: [number, number], to: [number, number]) => boolean;
  resetGame: () => void;
  promotePawn: (pieceType: "queen" | "rook" | "bishop" | "knight") => void;

  // Helpers
  isSquareSelected: (coord: [number, number]) => boolean;
  isValidMoveTarget: (coord: [number, number]) => boolean;
  getPieceAt: (
    coord: [number, number]
  ) => { type: PieceType; color: ChessColor } | null;

  // UI state
  selectedSquare: [number, number] | null;
  setSelectedSquare: (coord: [number, number] | null) => void;

  // Promotion state
  promotionPending: {
    from: [number, number];
    to: [number, number];
    color: ChessColor;
  } | null;
}

export const useChessGame = (): ChessGameHook => {
  const [chess] = useState(() => new Chess());
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(
    null
  );
  const [gameStateVersion, setGameStateVersion] = useState(0);
  const [capturedPieces, setCapturedPieces] = useState<
    Array<{ type: PieceType; color: ChessColor }>
  >([]);
  const [promotionPending, setPromotionPending] = useState<{
    from: [number, number];
    to: [number, number];
    color: ChessColor;
  } | null>(null);

  // Force re-render when game state changes
  const forceUpdate = useCallback(() => {
    setGameStateVersion((v) => v + 1);
  }, []);

  const gameState: GameState = useMemo(
    () => ({
      currentPlayer: chess.turn() as ChessColor,
      isCheck: chess.inCheck(),
      isCheckmate: chess.isCheckmate(),
      isStalemate: chess.isStalemate(),
      isDraw: chess.isDraw(),
      fen: chess.fen(),
      moveHistory: chess.history(),
      lastMove: chess.history({ verbose: true }).slice(-1)[0] || undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chess, gameStateVersion]
  );

  const pieces = useMemo(() => {
    const board = chess.board();
    const result: Array<{
      type: PieceType;
      color: ChessColor;
      coord: [number, number];
      square: Square;
    }> = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          const square = coordToSquare([row, col]);
          result.push({
            type: pieceSymbolToType(piece.type),
            color: piece.color as ChessColor,
            coord: [row, col],
            square,
          });
        }
      }
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chess, gameStateVersion]);

  const makeMove = useCallback(
    (from: [number, number], to: [number, number]): boolean => {
      try {
        const fromSquare = coordToSquare(from);
        const toSquare = coordToSquare(to);

        // Check if this move would result in pawn promotion
        const piece = chess.get(fromSquare);
        if (piece && piece.type === "p") {
          // Check if pawn is moving to promotion rank
          const isPromotion =
            (piece.color === "w" && to[0] === 0) ||
            (piece.color === "b" && to[0] === 7);

          if (isPromotion) {
            // Store promotion details and wait for user to choose piece
            setPromotionPending({
              from,
              to,
              color: piece.color,
            });
            setSelectedSquare(null);
            return true; // Move is valid, but waiting for promotion choice
          }
        }

        const move = chess.move({
          from: fromSquare,
          to: toSquare,
        });

        if (move) {
          // Track captured pieces
          if (move.captured) {
            const capturedPieceType = pieceSymbolToType(move.captured);
            const capturedPieceColor = move.color === "w" ? "b" : "w"; // Opposite of moving piece
            setCapturedPieces((prev) => [
              ...prev,
              { type: capturedPieceType, color: capturedPieceColor },
            ]);
          }

          forceUpdate();
          setSelectedSquare(null);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Invalid move:", error);
        return false;
      }
    },
    [chess, forceUpdate]
  );

  const promotePawn = useCallback(
    (pieceType: "queen" | "rook" | "bishop" | "knight") => {
      if (!promotionPending) return;

      try {
        const fromSquare = coordToSquare(promotionPending.from);
        const toSquare = coordToSquare(promotionPending.to);

        // Map piece type to chess.js symbols
        const promotionMap = {
          queen: "q",
          rook: "r",
          bishop: "b",
          knight: "n",
        };

        const move = chess.move({
          from: fromSquare,
          to: toSquare,
          promotion: promotionMap[pieceType],
        });

        if (move) {
          // Track captured pieces
          if (move.captured) {
            const capturedPieceType = pieceSymbolToType(move.captured);
            const capturedPieceColor = move.color === "w" ? "b" : "w";
            setCapturedPieces((prev) => [
              ...prev,
              { type: capturedPieceType, color: capturedPieceColor },
            ]);
          }

          setPromotionPending(null);
          forceUpdate();
        }
      } catch (error) {
        console.error("Invalid promotion:", error);
      }
    },
    [chess, promotionPending, forceUpdate]
  );

  const resetGame = useCallback(() => {
    chess.reset();
    setSelectedSquare(null);
    setCapturedPieces([]);
    setPromotionPending(null);
    forceUpdate();
  }, [chess, forceUpdate]);

  const isSquareSelected = useCallback(
    (coord: [number, number]): boolean => {
      return (
        selectedSquare !== null &&
        selectedSquare[0] === coord[0] &&
        selectedSquare[1] === coord[1]
      );
    },
    [selectedSquare]
  );

  const isValidMoveTarget = useCallback(
    (coord: [number, number]): boolean => {
      if (!selectedSquare) return false;

      try {
        const fromSquare = coordToSquare(selectedSquare);
        const toSquare = coordToSquare(coord);

        const moves = chess.moves({ square: fromSquare, verbose: true });
        return moves.some((move) => move.to === toSquare);
      } catch {
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chess, selectedSquare, gameStateVersion]
  );

  const getPieceAt = useCallback(
    (coord: [number, number]) => {
      const piece = pieces.find(
        (p) => p.coord[0] === coord[0] && p.coord[1] === coord[1]
      );
      return piece ? { type: piece.type, color: piece.color } : null;
    },
    [pieces]
  );

  return {
    gameState,
    pieces,
    capturedPieces,
    makeMove,
    resetGame,
    promotePawn,
    isSquareSelected,
    isValidMoveTarget,
    getPieceAt,
    selectedSquare,
    setSelectedSquare,
    promotionPending,
  };
};
