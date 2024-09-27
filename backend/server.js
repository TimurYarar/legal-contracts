const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let contracts = [];
let nextId = 1;

app.post("/api/contracts", (req, res) => {
  const newContract = {
    id: nextId++,
    updatedAt: new Date().toISOString().split("T")[0],
    ...req.body,
  };
  contracts.push(newContract);
  res.status(201).json(newContract);
});

app.get("/api/contracts", (req, res) => {
  res.json(contracts);
});

app.put("/api/contracts/:id", (req, res) => {
  const contractIndex = contracts.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (contractIndex > -1) {
    const updatedContract = {
      ...contracts[contractIndex],
      ...req.body,
      updatedAt: new Date().toISOString().split("T")[0], // Оновлення поля updatedAt
    };
    contracts[contractIndex] = updatedContract;
    res.json(updatedContract);
  } else {
    res.status(404).send("Contract not found");
  }
});

app.delete("/api/contracts/:id", (req, res) => {
  const contractIndex = contracts.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (contractIndex > -1) {
    contracts.splice(contractIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Contract not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
