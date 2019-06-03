const express = require("express");
const server = express();

const db = require("./data/accounts-model.js");

server.get("/", async (req, res) => {
  try {
    const budgets = await db.find();
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Error finding budgets" });
  }
});

server.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const budget = await db.findById(id);
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Error finding this budget" });
  }
});

module.exports = server;
