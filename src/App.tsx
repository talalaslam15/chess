// import { useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import Tree from "./test";

const data = [
  {
    id: 1,
    name: "To-Do",
    cards: [
      {
        id: 1,
        name: "card1",
        children: [
          { id: 7, name: "1.1" },
          { id: 8, name: "1.2" },
        ],
      },
      {
        id: 2,
        name: "card2",
        children: [
          { id: 9, name: "2.1" },
          { id: 10, name: "2.2" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Doing",
    cards: [
      { id: 3, name: "card3", children: [{ id: 11, name: "3.1" }] },
      { id: 4, name: "card4", children: [{ id: 12, name: "4.1" }] },
    ],
  },
  {
    id: 3,
    name: "Done",
    cards: [
      { id: 5, name: "card5", children: [{ id: 13, name: "5.1" }] },
      { id: 6, name: "card6", children: [{ id: 14, name: "6.1" }] },
    ],
  },
];

function App() {
  // const [board, setBoard] = useState(data);

  // return <Tree />;
  return <h1>Hello </h1>;
}

export default App;
