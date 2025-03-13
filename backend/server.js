const express = require("express");
const cors = require("cors");
const solverRoutes = require("./routes/solver");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", solverRoutes);

const PORT = 6083;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
