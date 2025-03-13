import React, { useState } from "react";
import { embaralharPuzzle } from "../services/api";

const Controls = ({ onSolve, onShuffle }) => {
    const [algorithm, setAlgorithm] = useState("bfs");

    const handleShuffle = async () => {
        const newState = await embaralharPuzzle();
        onShuffle(newState);
    };

    return (
        <div>
            <label>Escolha um algoritmo:</label>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="bfs">BFS (Busca em Largura)</option>
                <option value="aStar">A* (A Estrela)</option>
            </select>
            <button onClick={() => onSolve(algorithm)}>Resolver</button>
            <button onClick={handleShuffle}>Embaralhar</button>
        </div>
    );
};

export default Controls;
