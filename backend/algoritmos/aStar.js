export function aStar(initialState, goalState) {
    const openSet = [{ state: initialState, path: [], cost: 0 }];
    const visited = new Set();
    visited.add(initialState.toString());

    while (openSet.length > 0) {
        openSet.sort((a, b) => (a.cost + heuristic(a.state, goalState)) - (b.cost + heuristic(b.state, goalState)));
        const { state, path, cost } = openSet.shift();

        if (state.toString() === goalState.toString()) {
            return { solution: path, nodesVisited: visited.size };
        }

        for (let move of getValidMoves(state)) {
            let newState = applyMove(state, move);
            if (!visited.has(newState.toString())) {
                visited.add(newState.toString());
                openSet.push({ state: newState, path: [...path, move], cost: cost + 1 });
            }
        }
    }

    return { solution: null, nodesVisited: visited.size };
}

function heuristic(state, goalState) {
    let distance = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i] !== 0) {
            let goalIndex = goalState.indexOf(state[i]);
            distance += Math.abs(Math.floor(i / 3) - Math.floor(goalIndex / 3)) +
                        Math.abs((i % 3) - (goalIndex % 3));
        }
    }
    return distance;
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
