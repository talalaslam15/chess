/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChessColor } from "../types/chess";
import { pieceLookup } from "../chess-pieces";

interface PromotionModalProps {
  color: ChessColor;
  onSelect: (pieceType: "queen" | "rook" | "bishop" | "knight") => void;
}

const modalOverlayStyles = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

const modalContentStyles = css({
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
});

const titleStyles = css({
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#333",
});

const piecesContainerStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "12px",
  marginTop: "16px",
});

const pieceButtonStyles = css({
  background: "none",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  padding: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    borderColor: "#432dd0",
    backgroundColor: "#f8f9ff",
    transform: "translateY(-2px)",
  },

  "&:active": {
    transform: "translateY(0)",
  },
});

const pieceImageStyles = css({
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 8px",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const pieceLabelStyles = css({
  fontSize: "14px",
  fontWeight: "500",
  color: "#666",
  textTransform: "capitalize",
});

export const PromotionModal: React.FC<PromotionModalProps> = ({
  color,
  onSelect,
}) => {
  const promotionPieces: Array<{
    type: "queen" | "rook" | "bishop" | "knight";
    label: string;
  }> = [
    { type: "queen", label: "Queen" },
    { type: "rook", label: "Rook" },
    { type: "bishop", label: "Bishop" },
    { type: "knight", label: "Knight" },
  ];

  return (
    <div css={modalOverlayStyles}>
      <div css={modalContentStyles}>
        <h3 css={titleStyles}>Choose Promotion Piece</h3>
        <p style={{ color: "#666", marginBottom: "16px" }}>
          Select which piece to promote your pawn to:
        </p>

        <div css={piecesContainerStyles}>
          {promotionPieces.map(({ type, label }) => {
            const pieceComponent = pieceLookup[type](color);

            return (
              <button
                key={type}
                css={pieceButtonStyles}
                onClick={() => onSelect(type)}
              >
                <div css={pieceImageStyles}>{pieceComponent}</div>
                <div css={pieceLabelStyles}>{label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
