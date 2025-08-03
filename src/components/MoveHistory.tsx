/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface MoveHistoryProps {
  moves: string[];
  onMoveClick?: (moveIndex: number) => void;
}

const moveHistoryStyles = css({
  maxHeight: "300px",
  overflowY: "auto",
  backgroundColor: "#f8f9fa",
  border: "1px solid #dee2e6",
  borderRadius: "6px",
  padding: "12px",
  fontFamily: "ui-monospace, 'SF Mono', 'Monaco', 'Cascadia Code', monospace",
  fontSize: "13px",

  "@media (max-width: 768px)": {
    maxHeight: "200px",
    padding: "8px",
    fontSize: "12px",
  },
});

const moveItemStyles = css({
  padding: "3px 6px",
  margin: "1px 0",
  borderRadius: "3px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  lineHeight: "1.4",

  "&:hover": {
    backgroundColor: "#e9ecef",
  },

  "@media (max-width: 768px)": {
    padding: "2px 4px",
    fontSize: "11px",
  },
});

export function MoveHistory({ moves, onMoveClick }: MoveHistoryProps) {
  const formatMoves = () => {
    const formattedMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      const whiteMove = moves[i];
      const blackMove = moves[i + 1];

      formattedMoves.push(
        <div key={i} css={moveItemStyles}>
          <span style={{ fontWeight: "bold", marginRight: "8px" }}>
            {moveNumber}.
          </span>
          <span
            style={{ marginRight: "12px", cursor: "pointer" }}
            onClick={() => onMoveClick?.(i)}
          >
            {whiteMove}
          </span>
          {blackMove && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onMoveClick?.(i + 1)}
            >
              {blackMove}
            </span>
          )}
        </div>
      );
    }
    return formattedMoves;
  };

  return (
    <div css={moveHistoryStyles}>
      <h3
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#333",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        Move History
      </h3>
      {moves.length === 0 ? (
        <div
          style={{
            color: "#6c757d",
            fontStyle: "italic",
            fontSize: "12px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          No moves yet
        </div>
      ) : (
        <div>{formatMoves()}</div>
      )}
    </div>
  );
}
