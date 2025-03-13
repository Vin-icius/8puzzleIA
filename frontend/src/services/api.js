export const solvePuzzle = async (initialState, goalState, algorithm) => {
    try {
        console.log("Enviando requisição:", { initialState, goalState, algorithm });

        const response = await fetch("http://localhost:6083/api/solve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initialState, goalState, algorithm }),
        });

        const data = await response.json();
        console.log("Resposta da API:", data);

        return data.solution;
    } catch (error) {
        console.error("Erro ao buscar solução:", error);
        return [];
    }
};


export const embaralharPuzzle = async () => {
    const response = await fetch("http://localhost:6083/api/embaralhar");
    const data = await response.json();
    return data.shuffledState;
};

