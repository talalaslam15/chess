/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Coord, PieceRecord } from "./ChessBoard";
import { isEqualCoord, isValidMoveForPiece } from "./utils";
import { pieceLookup } from "./chess-pieces";

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

export function renderSquares(
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
