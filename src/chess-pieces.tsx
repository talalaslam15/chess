/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import king from "/king.png";
import pawn from "/pawn.png";
import queen from "/queen.png";
import bishop from "/bishop.png";
import knight from "/knight.png";
import rook from "/rook.png";
import { type ReactElement } from "react";

export type PieceType =
  | "king"
  | "pawn"
  | "queen"
  | "bishop"
  | "knight"
  | "rook";

export const pieceLookup: { [Key in PieceType]: () => ReactElement } = {
  king: () => <King />,
  pawn: () => <Pawn />,
  queen: () => <Queen />,
  bishop: () => <Bishop />,
  knight: () => <Knight />,
  rook: () => <Rook />,
};
export function King() {
  return <Piece image={king} alt="King" />;
}
export function Queen() {
  return <Piece image={queen} alt="Queen" />;
}
export function Knight() {
  return <Piece image={knight} alt="Knight" />;
}
export function Bishop() {
  return <Piece image={bishop} alt="Bishop" />;
}
export function Rook() {
  return <Piece image={rook} alt="Rook" />;
}

export function Pawn() {
  return <Piece image={pawn} alt="Pawn" />;
}

type PieceProps = {
  image: string;
  alt: string;
};

function Piece({ image, alt }: PieceProps) {
  return <img css={imageStyles} src={image} alt={alt} draggable="false" />; // draggable set to false to prevent dragging of the images
}
const imageStyles = css({
  width: 100,
  height: 100,
  "&:hover": {
    cursor: "pointer",
  },
});
