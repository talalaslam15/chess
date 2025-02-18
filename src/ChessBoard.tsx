/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { PieceType } from "./chess-pieces";
import { isValidMoveForPiece } from "./utils";
import { chessboardStyles } from "./styles";
import { initialPieces } from "./initial-position";
import { renderSquares } from "./render-squares";

export type Coord = [number, number];

export type PieceRecord = {
  id: string; // Add an id to uniquely identify each piece
  type: PieceType;
  location: Coord;
};

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

function Chessboard() {
  const [selectedPiece, setSelectedPiece] = useState<PieceRecord | null>(null);
  const [pieces, setPieces] = useState<PieceRecord[]>(initialPieces);

  const handlePieceClick = (piece: PieceRecord) => {
    if (piece.id === selectedPiece?.id) setSelectedPiece(null);
    else setSelectedPiece(piece);
  };

  const handleNewLocation = (newLocation: Coord) => {
    if (!selectedPiece) return;
    if (!isValidMoveForPiece(selectedPiece, newLocation, pieces)) {
      setSelectedPiece(null);
      return;
    }

    const newPieces = pieces.map((piece) =>
      selectedPiece.id === piece.id
        ? { ...piece, location: newLocation }
        : piece
    );

    setPieces(newPieces);
    setSelectedPiece(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#1f1f1f",
      }}
    >
      <div css={chessboardStyles}>
        {renderSquares(
          pieces,
          selectedPiece,
          handlePieceClick,
          handleNewLocation
        )}
      </div>
    </div>
  );
}

export default Chessboard;
