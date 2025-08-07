/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// White pieces
import whiteKing from "/white/king.png";
import whitePawn from "/white/pawn.png";
import whiteQueen from "/white/queen.png";
import whiteBishop from "/white/bishop.png";
import whiteKnight from "/white/knight.png";
import whiteRook from "/white/rook.png";
// Black pieces
import blackKing from "/black/king.png";
import blackPawn from "/black/pawn.png";
import blackQueen from "/black/queen.png";
import blackBishop from "/black/bishop.png";
import blackKnight from "/black/knight.png";
import blackRook from "/black/rook.png";
import { type ReactElement } from "react";
import { ChessColor, PieceType } from "./types/chess";

export type { PieceType } from "./types/chess";

const pieceImages = {
  w: {
    king: whiteKing,
    queen: whiteQueen,
    rook: whiteRook,
    bishop: whiteBishop,
    knight: whiteKnight,
    pawn: whitePawn,
  },
  b: {
    king: blackKing,
    queen: blackQueen,
    rook: blackRook,
    bishop: blackBishop,
    knight: blackKnight,
    pawn: blackPawn,
  },
} as const;

export const pieceLookup: {
  [Key in PieceType]: (color: ChessColor) => ReactElement;
} = {
  king: (color) => <King color={color} />,
  pawn: (color) => <Pawn color={color} />,
  queen: (color) => <Queen color={color} />,
  bishop: (color) => <Bishop color={color} />,
  knight: (color) => <Knight color={color} />,
  rook: (color) => <Rook color={color} />,
};

interface PieceComponentProps {
  color: ChessColor;
}

export function King({ color }: PieceComponentProps) {
  return (
    <Piece
      image={pieceImages[color].king}
      alt={`${color === "w" ? "White" : "Black"} King`}
    />
  );
}
export function Queen({ color }: PieceComponentProps) {
  return (
    <Piece
      image={pieceImages[color].queen}
      alt={`${color === "w" ? "White" : "Black"} Queen`}
    />
  );
}
export function Knight({ color }: PieceComponentProps) {
  return (
    <Piece
      image={pieceImages[color].knight}
      alt={`${color === "w" ? "White" : "Black"} Knight`}
    />
  );
}
export function Bishop({ color }: PieceComponentProps) {
  return (
    <Piece
      image={pieceImages[color].bishop}
      alt={`${color === "w" ? "White" : "Black"} Bishop`}
    />
  );
}
export function Rook({ color }: PieceComponentProps) {
  return (
    <Piece
      image={pieceImages[color].rook}
      alt={`${color === "w" ? "White" : "Black"} Rook`}
    />
  );
}

export function Pawn({ color }: PieceComponentProps) {
  return (
    <Piece
      image={pieceImages[color].pawn}
      alt={`${color === "w" ? "White" : "Black"} Pawn`}
    />
  );
}

type PieceProps = {
  image: string;
  alt: string;
};

function Piece({ image, alt }: PieceProps) {
  return <img css={imageStyles} src={image} alt={alt} draggable="false" />; // draggable set to false to prevent dragging of the images
}

const imageStyles = css({
  // Responsive piece sizing - adapts to square size
  width: "85%",
  height: "85%",
  minWidth: "20px", // Minimum size to ensure visibility at extreme zoom levels
  minHeight: "20px",
  objectFit: "contain",
  userSelect: "none",
  transition: "transform 0.1s ease",

  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05)",
  },

  // Mobile optimizations
  "@media (max-width: 768px)": {
    width: "80%",
    height: "80%",
    minWidth: "18px", // Slightly smaller minimum for mobile
    minHeight: "18px",
  },

  // Very small screens
  "@media (max-width: 480px)": {
    width: "75%",
    height: "75%",
    minWidth: "16px", // Even smaller minimum for very small screens
    minHeight: "16px",
  },
});
