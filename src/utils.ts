import { Coord, PieceRecord } from "./ChessBoard";

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

export function isValidMoveForPiece(
  piece: PieceRecord,
  targetCoord: Coord,
  pieces: PieceRecord[]
): boolean {
  const [x, y] = piece.location;
  const [targetX, targetY] = targetCoord;

  const isOccupied = pieces.some(
    (p) => p.id !== piece.id && isEqualCoord(p.location, targetCoord)
  );
  if (isOccupied) return false;

  const isPathClear = (start: Coord, end: Coord): boolean => {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const dx = Math.sign(endX - startX);
    const dy = Math.sign(endY - startY);

    let [currentX, currentY] = [startX + dx, startY + dy];

    while (currentX !== endX || currentY !== endY) {
      if (pieces.some((p) => isEqualCoord(p.location, [currentX, currentY]))) {
        return false;
      }
      currentX += dx;
      currentY += dy;
    }

    return true;
  };

  switch (piece.type) {
    case "king":
      return (
        Math.abs(x - targetX) <= 1 &&
        Math.abs(y - targetY) <= 1 &&
        (x !== targetX || y !== targetY)
      );
    case "pawn": {
      const initialPawnRow = 6;
      const isInitialPosition = piece.location[0] === initialPawnRow;
      const forwardMove = targetX === x - 1 && y === targetY;
      const doubleForwardMove =
        isInitialPosition &&
        targetX === x - 2 &&
        y === targetY &&
        isPathClear([x, y], [targetX, targetY]);
      return forwardMove || doubleForwardMove;
    }
    case "queen": {
      const isSameRow = x === targetX;
      const isSameColumn = y === targetY;
      const isSameDiagonal = Math.abs(x - targetX) === Math.abs(y - targetY);
      return (
        (isSameRow || isSameColumn || isSameDiagonal) &&
        !isEqualCoord([x, y], [targetX, targetY]) &&
        isPathClear([x, y], [targetX, targetY])
      );
    }
    case "bishop":
      return (
        Math.abs(x - targetX) === Math.abs(y - targetY) &&
        !isEqualCoord([x, y], [targetX, targetY]) &&
        isPathClear([x, y], [targetX, targetY])
      );
    case "knight": {
      const dx = Math.abs(x - targetX);
      const dy = Math.abs(y - targetY);
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }
    case "rook":
      return (
        (x === targetX || y === targetY) &&
        !isEqualCoord([x, y], [targetX, targetY]) &&
        isPathClear([x, y], [targetX, targetY])
      );
    default:
      return false;
  }
}
