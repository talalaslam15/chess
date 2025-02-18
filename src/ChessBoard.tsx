/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { css } from "@emotion/react";
import { pieceLookup, PieceType } from "./chess-pieces";
import { isValidMoveForPiece } from "./utils";

export type Coord = [number, number];

export type PieceRecord = {
  id: string; // Add an id to uniquely identify each piece
  type: PieceType;
  location: Coord;
};

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

function renderSquares(
  pieces: PieceRecord[],
  selectedPiece: PieceRecord | null,
  handlePieceClick: (piece: PieceRecord) => void,
  handleNewLocation: (newLocation: Coord) => void
) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];

      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCoord)
      );

      const isDark = (row + col) % 2 === 1;
      const isSelected =
        selectedPiece && isEqualCoord(selectedPiece.location, squareCoord);
      const isValidMove =
        selectedPiece &&
        isValidMoveForPiece(selectedPiece, squareCoord, pieces);

      squares.push(
        <div
          key={`${row}-${col}`}
          style={{
            backgroundColor: isSelected
              ? "lightblue"
              : isDark
              ? "lightgrey"
              : "white",
            position: "relative",
          }}
          css={squareStyles}
          onClick={() => {
            piece && handlePieceClick(piece);
            if (pieces.some((p) => isEqualCoord(p.location, squareCoord)))
              return;
            handleNewLocation(squareCoord);
          }}
        >
          {isValidMove && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "25%",
                borderRadius: "50%",
                backgroundColor: "teal",
                opacity: 0.7,
                pointerEvents: "none",
              }}
            />
          )}

          {piece && pieceLookup[piece.type]()}
        </div>
      );
    }
  }
  return squares;
}

function Chessboard() {
  const [selectedPiece, setSelectedPiece] = useState<PieceRecord | null>(null);
  const [pieces, setPieces] = useState<PieceRecord[]>([
    // give initial positions to the pieces with unique ids
    { id: "king1", type: "king", location: [7, 4] },
    { id: "pawn1", type: "pawn", location: [6, 0] },
    { id: "pawn2", type: "pawn", location: [6, 1] },
    { id: "pawn3", type: "pawn", location: [6, 2] },
    { id: "pawn4", type: "pawn", location: [6, 3] },
    { id: "pawn5", type: "pawn", location: [6, 4] },
    { id: "pawn6", type: "pawn", location: [6, 5] },
    { id: "pawn7", type: "pawn", location: [6, 6] },
    { id: "pawn8", type: "pawn", location: [6, 7] },
    { id: "queen1", type: "queen", location: [7, 3] },
    { id: "rook1", type: "rook", location: [7, 0] },
    { id: "bishop1", type: "bishop", location: [7, 2] },
    { id: "knight1", type: "knight", location: [7, 1] },
    { id: "rook2", type: "rook", location: [7, 7] },
    { id: "bishop2", type: "bishop", location: [7, 5] },
    { id: "knight2", type: "knight", location: [7, 6] },
  ]);

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

const chessboardStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "repeat(8, 1fr)",
  width: "100vh",
  height: "100vh",
  border: "3px solid lightgrey",
});

const squareStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "lightblue",
  },
});

export default Chessboard;
