const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const solverRoutes = require("./routes/solver");
const embaralharPuzzle = require("./algoritmos/embaralharPuzzle");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", solverRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
