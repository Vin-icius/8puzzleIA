export const embaralharPuzzle = (goalState, moves = 100) => {
    let state = [...goalState];
    let emptyIndex = state.indexOf(0);
    const possibleMoves = { "UP": -3, "DOWN": 3, "LEFT": -1, "RIGHT": 1 };

    for (let i = 0; i < moves; i++) {
        let validMoves = [];

        if (emptyIndex % 3 !== 0) validMoves.push("LEFT"); // Não está na 1ª coluna
        if (emptyIndex % 3 !== 2) validMoves.push("RIGHT"); // Não está na 3ª coluna
        if (emptyIndex > 2) validMoves.push("UP"); // Não está na 1ª linha
        if (emptyIndex < 6) validMoves.push("DOWN"); // Não está na 3ª linha

        let move = validMoves[Math.floor(Math.random() * validMoves.length)];
        let newIndex = emptyIndex + possibleMoves[move];

        [state[emptyIndex], state[newIndex]] = [state[newIndex], state[emptyIndex]];
        emptyIndex = newIndex;
    }

    return state;
};
