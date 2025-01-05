import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import Chessboard from "./ChessBoard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <Chessboard />
  </StrictMode>
);

// const x = React.createElement("h1", null, ["Hello", "world!"]);
// console.log(x);
// createRoot(document.getElementById("root")!).render(x);
