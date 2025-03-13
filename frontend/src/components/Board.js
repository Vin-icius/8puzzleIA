import React from "react";
import "./board.css";

const Board = ({ state }) => {
    return (
        <div className="board">
            {state.map((num, index) => (
                <div key={index} className={`tile ${num === 0 ? "empty" : ""}`}>
                    {num !== 0 ? num : ""}
                </div>
            ))}
        </div>
    );
};

export default Board;
