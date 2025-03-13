export function bfs(initialState, goalState) {
    const queue = [{ state: initialState, path: [] }];
    const visited = new Set();
    visited.add(initialState.toString());

    while (queue.length > 0) {
        const { state, path } = queue.shift();

        if (state.toString() === goalState.toString()) {
            return { solution: path, nodesVisited: visited.size };
        }

        for (let move of getValidMoves(state)) {
            let newState = applyMove(state, move);
            if (!visited.has(newState.toString())) {
                visited.add(newState.toString());
                queue.push({ state: newState, path: [...path, move] });
            }
        }
    }

    return { solution: null, nodesVisited: visited.size };
}

function getValidMoves(state) {
    const index = state.indexOf(0);
    const moves = [];

    if (index > 2) moves.push("UP");
    if (index < 6) moves.push("DOWN");
    if (index % 3 !== 0) moves.push("LEFT");
    if (index % 3 !== 2) moves.push("RIGHT");

    return moves;
}

function applyMove(state, move) {
    const newState = [...state];
    const index = newState.indexOf(0);
    const moveMap = { "UP": -3, "DOWN": 3, "LEFT": -1, "RIGHT": 1 };
    const newIndex = index + moveMap[move];

    [newState[index], newState[newIndex]] = [newState[newIndex], newState[index]];
    return newState;
}

