/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useChessGame } from "../hooks/useChessGame";
import { pieceLookup } from "../chess-pieces";
import { MoveHistory } from "./MoveHistory";
import { CapturedPieces } from "./CapturedPieces";
import { PromotionModal } from "./PromotionModal";

// Main container styles
const containerStyles = css({
  display: "flex",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#f5f5f5",
  overflow: "hidden",

  // Mobile layout - stack vertically
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },

  // Desktop layout - side by side
  "@media (min-width: 769px)": {
    flexDirection: "row",
  },
});

// Chess board container to maintain aspect ratio
const boardContainerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  // Mobile: take most of the height
  "@media (max-width: 768px)": {
    height: "70vh",
    order: 2,
  },

  // Desktop: center the board
  "@media (min-width: 769px)": {
    height: "100vh",
  },
});

// Chess board grid
const chessboardStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "repeat(8, 1fr)",
  border: "3px solid #432dd0",
  borderRadius: "4px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  backgroundColor: "#fff",

  // Responsive size - always square
  width: "min(100vmin, 100vh)",
  height: "min(100vmin, 100vh)",

  // On mobile, adjust for available space
  "@media (max-width: 768px)": {
    width: "min(95vw, 70vh)",
    height: "min(95vw, 70vh)",
  },
});

// Side panels container
const sidePanelsStyles = css({
  display: "flex",
  backgroundColor: "#ffffff",
  borderLeft: "1px solid #e0e0e0",

  // Mobile: horizontal layout at bottom
  "@media (max-width: 768px)": {
    flexDirection: "row",
    height: "30vh",
    order: 1,
    borderLeft: "none",
    borderBottom: "1px solid #e0e0e0",
    overflow: "auto",
  },

  // Desktop: vertical layout on the right
  "@media (min-width: 769px)": {
    flexDirection: "column",
    width: "320px",
    height: "100vh",
    overflow: "auto",
  },
});

const sidePanelStyles = css({
  padding: "8px",

  "@media (max-width: 768px)": {
    flex: 1,
    minWidth: "200px",
  },

  "@media (min-width: 769px)": {
    borderBottom: "1px solid #e0e0e0",
  },
});

const squareStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    filter: "brightness(1.1)",
  },
});

const gameInfoStyles = css({
  padding: "16px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "14px",

  "@media (max-width: 768px)": {
    padding: "12px",
    fontSize: "12px",
  },
});

const moveIndicatorStyles = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "30%",
  borderRadius: "50%",
  backgroundColor: "#00786f",
  pointerEvents: "none",
  zIndex: 1,
});

const captureIndicatorStyles = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  borderRadius: "50%",
  border: "4px solid rgba(255, 0, 0, 0.7)",
  backgroundColor: "transparent",
  pointerEvents: "none",
  zIndex: 1,
});

function ChessBoard() {
  const {
    gameState,
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
  } = useChessGame();

  const handleSquareClick = (coord: [number, number]) => {
    const piece = getPieceAt(coord);

    if (selectedSquare) {
      if (isSquareSelected(coord)) {
        // Deselect if clicking the same square
        setSelectedSquare(null);
      } else if (isValidMoveTarget(coord)) {
        // Make the move
        makeMove(selectedSquare, coord);
      } else if (piece && piece.color === gameState.currentPlayer) {
        // Select a different piece of the current player
        setSelectedSquare(coord);
      } else {
        // Deselect if clicking invalid target
        setSelectedSquare(null);
      }
    } else if (piece && piece.color === gameState.currentPlayer) {
      // Select a piece of the current player
      setSelectedSquare(coord);
    }
  };

  const renderSquares = () => {
    const squares = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const coord: [number, number] = [row, col];
        const piece = getPieceAt(coord);
        const isDark = (row + col) % 2 === 1;
        const isSelected = isSquareSelected(coord);
        const isValidMove = isValidMoveTarget(coord);
        const hasPiece = !!piece;

        squares.push(
          <div
            key={`${row}-${col}`}
            css={squareStyles}
            style={{
              backgroundColor: isSelected
                ? "#fccee8"
                : isDark
                ? "#5596f2"
                : "#f2f6fa",
            }}
            onClick={() => handleSquareClick(coord)}
          >
            {/* Move indicators */}
            {isValidMove && !hasPiece && <div css={moveIndicatorStyles} />}
            {isValidMove && hasPiece && <div css={captureIndicatorStyles} />}

            {/* Chess piece */}
            {piece && pieceLookup[piece.type](piece.color)}
          </div>
        );
      }
    }

    return squares;
  };

  const getGameStatusText = () => {
    if (gameState.isCheckmate) {
      return `Checkmate! ${
        gameState.currentPlayer === "w" ? "Black" : "White"
      } wins!`;
    }
    if (gameState.isStalemate) {
      return "Stalemate! It's a draw.";
    }
    if (gameState.isDraw) {
      return "Draw!";
    }
    if (gameState.isCheck) {
      return `${
        gameState.currentPlayer === "w" ? "White" : "Black"
      } is in check!`;
    }
    return `${gameState.currentPlayer === "w" ? "White" : "Black"} to move`;
  };

  return (
    <div css={containerStyles}>
      {/* Main board container */}
      <div css={boardContainerStyles}>
        <div css={chessboardStyles}>{renderSquares()}</div>
      </div>

      {/* Side panels */}
      <div css={sidePanelsStyles}>
        {/* Game info and white captured pieces */}
        <div css={sidePanelStyles}>
          <div css={gameInfoStyles}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              {getGameStatusText()}
            </div>
            <div
              style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}
            >
              Moves: {gameState.moveHistory.length}
              {gameState.lastMove && (
                <div style={{ marginTop: "4px" }}>
                  Last: {gameState.lastMove.from} → {gameState.lastMove.to}
                </div>
              )}
            </div>
            <button
              onClick={resetGame}
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#0056b3";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#007bff";
              }}
            >
              New Game
            </button>
          </div>

          <div style={{ marginTop: "16px" }}>
            <CapturedPieces capturedPieces={capturedPieces} playerColor="w" />
          </div>
        </div>

        {/* Black captured pieces and move history */}
        <div css={sidePanelStyles}>
          <CapturedPieces capturedPieces={capturedPieces} playerColor="b" />

          <div style={{ marginTop: "16px" }}>
            <MoveHistory moves={gameState.moveHistory} />
          </div>
        </div>
      </div>

      {/* Promotion Modal */}
      {promotionPending && (
        <PromotionModal
          color={promotionPending.color}
          onSelect={(pieceType) => {
            promotePawn(pieceType);
          }}
        />
      )}
    </div>
  );
}

export default ChessBoard;
