import { Color, PieceSymbol, Square } from "chess.js";

export type ChessColor = Color; // 'w' | 'b'
export type ChessPieceSymbol = PieceSymbol; // 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
export type ChessSquare = Square; // 'a1' | 'a2' | ... | 'h8'

export type PieceType =
  | "king"
  | "queen"
  | "rook"
  | "bishop"
  | "knight"
  | "pawn";

export interface ChessPiece {
  type: PieceType;
  color: ChessColor;
  square: ChessSquare;
}

export interface GameState {
  currentPlayer: ChessColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  fen: string;
  moveHistory: string[];
  lastMove?: {
    from: ChessSquare;
    to: ChessSquare;
    piece: ChessPieceSymbol;
    captured?: ChessPieceSymbol;
  };
}

export interface Player {
  id: string;
  name: string;
  color: ChessColor;
}
