import React, { useState } from 'react';
import './App.css';
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(25).fill(null));

  function handedClick(i) {
    if (squares[i] || calculateWinner(squares)) { return; }; // Ignore click if square is already filled
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"; // For simplicity, we are always placing "X" on click.
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // Toggle the turn
  }

  function resetGame(){
    setSquares(Array(25).fill(null)); // Reset the squares to null
    setXIsNext(true); // Reset the turn to X
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!, Reset the game";
    //resetGame(); // Reset the game if it's a draw
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const row = [0, 1, 2, 3, 4, 5];
  const col = [0, 1, 2, 3, 4, 5];

  return (
    <>
      <div className="status">{status}</div>
      {row.map((rowIndex) =>
        <div className="board-row" key={rowIndex}>
          {col.map((colIndex) => (
            <Square className="" key={rowIndex * 6 + colIndex} value={squares[rowIndex * 6 + colIndex]} onSquareClick={() => handedClick(rowIndex * 6 + colIndex)} />
          )
          )}
        </div>
      )}
      <button className='reset'onClick={()=>{resetGame()}}>Reset</button>
    </>
  );

}

function calculateWinner(squares) {
  const line = [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16],
    [13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22],
    [19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28],
    [25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34],
    [31, 32, 33, 34, 35],
    [0, 6, 12, 18, 24],
    [6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25],
    [7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26],
    [8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27],
    [9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28],
    [10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29],
    [11, 17, 23, 29, 35],
    [0, 7, 14, 21, 28],
    [1, 8, 15, 22, 29],
    [6, 13, 20, 27, 34],
    [7, 14, 21, 28, 35],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [10, 15, 20, 25, 30],
    [11, 16, 21, 26, 31]
  ];
  for (const element of line) {
    const [a, b, c, d, e] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a]; // Return the winner ("X" or "O")
    }
  }
  return null;
}
