import React, { useState } from "react";
import Board from "./components/Board";
import Controls from "./components/controls";
import { solvePuzzle } from "./services/api";

const App = () => {
    const [initialState, setInitialState] = useState([1, 2, 3, 4, 0, 5, 6, 7, 8]);
    const [goalState] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    const [solution, setSolution] = useState([]);
    const [currentState, setCurrentState] = useState(initialState);

    const handleSolve = async (algorithm) => {
        const result = await solvePuzzle(initialState, goalState, algorithm);
        setSolution(result || []);
        playSolution(result); // Chamando playSolution corretamente
    };

    // ✅ Adicionando a função playSolution
    const playSolution = (moves) => {
        if (!moves || moves.length === 0) return;

        let state = [...initialState];
        let index = state.indexOf(0);
        let step = 0;

        const moveMap = { "UP": -3, "DOWN": 3, "LEFT": -1, "RIGHT": 1 };

        const interval = setInterval(() => {
            if (step >= moves.length) {
                clearInterval(interval);
                return;
            }

            let move = moves[step++];
            let newIndex = index + moveMap[move];

            [state[index], state[newIndex]] = [state[newIndex], state[index]];
            index = newIndex;
            setCurrentState([...state]);
        }, 500);
    };

    const handleShuffle = (newState) => {
        setInitialState(newState);
        setCurrentState(newState);
        setSolution([]);
    };

    return (
        <div>
            <h1>8-Puzzle Solver</h1>
            <Board state={currentState} />
            <Controls onSolve={handleSolve} onShuffle={handleShuffle} />
        </div>
    );
};

export default App;
