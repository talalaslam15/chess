import { PieceRecord } from "./ChessBoard";

export const initialPieces: PieceRecord[] = [
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
];
