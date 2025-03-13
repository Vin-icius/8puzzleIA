const express = require("express");
const { bfs } = require("../algoritmos/bfs");
const { astar } = require("../algoritmos/aStar");
const { embaralharPuzzle } = require("../algoritmos/embaralharPuzzle");

const router = express.Router();

router.post("/solve", (req, res) => {
    const { initialState, goalState, algorithm } = req.body;

    if (!initialState || !goalState || !algorithm) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    let solution;
    let nodesVisited = 0;
    let executionTime = 0;
    
    const start = Date.now();

    if (algorithm === "bfs") {
        ({ solution, nodesVisited } = bfs(initialState, goalState));
    } else if (algorithm === "astar") {
        ({ solution, nodesVisited } = astar(initialState, goalState));
    } else {
        return res.status(400).json({ error: "Algoritmo inválido" });
    }

    executionTime = Date.now() - start;

    res.json({ solution, nodesVisited, executionTime });
});

router.get("/embaralhar", (req, res) => {
    const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // Estado final correto
    const shuffledState = embaralharPuzzle(goalState, 100); // Embaralha com 100 movimentos
    res.json({ shuffledState });
});

module.exports = router;
