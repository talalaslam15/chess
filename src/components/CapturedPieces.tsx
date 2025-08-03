/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { pieceLookup } from "../chess-pieces";
import { ChessColor, PieceType } from "../types/chess";

interface CapturedPiecesProps {
  capturedPieces: { type: PieceType; color: ChessColor }[];
  playerColor: ChessColor;
}

const capturedPiecesStyles = css({
  backgroundColor: "#f8f9fa",
  border: "1px solid #dee2e6",
  borderRadius: "6px",
  padding: "8px",
  minHeight: "50px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "3px",

  "@media (max-width: 768px)": {
    padding: "6px",
    minHeight: "40px",
    gap: "2px",
  },
});

const miniPieceStyles = css({
  "& img": {
    width: "24px !important",
    height: "24px !important",
    maxWidth: "24px !important",
    maxHeight: "24px !important",
    transition: "none !important",

    "&:hover": {
      transform: "none !important",
    },

    "@media (max-width: 768px)": {
      width: "20px !important",
      height: "20px !important",
      maxWidth: "20px !important",
      maxHeight: "20px !important",
    },
  },
});

export function CapturedPieces({
  capturedPieces,
  playerColor,
}: CapturedPiecesProps) {
  const playerCapturedPieces = capturedPieces.filter(
    (piece) => piece.color !== playerColor
  );

  return (
    <div>
      <h4
        style={{
          margin: "0 0 6px 0",
          fontSize: "13px",
          color: "#6c757d",
          fontWeight: "600",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        Captured by {playerColor === "w" ? "White" : "Black"}
      </h4>
      <div css={capturedPiecesStyles}>
        {playerCapturedPieces.length === 0 ? (
          <span
            style={{
              color: "#6c757d",
              fontStyle: "italic",
              fontSize: "11px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            No captures yet
          </span>
        ) : (
          playerCapturedPieces.map((piece, index) => (
            <div key={index} css={miniPieceStyles}>
              {pieceLookup[piece.type](piece.color)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
