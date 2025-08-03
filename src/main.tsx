// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChessBoard from "./components/ChessBoard.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ChessBoard />
  // </StrictMode>
);
