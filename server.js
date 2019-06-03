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

server.put("/:id", async (req, res) => {
  try {
    const updates = await db.update(req.params.id, req.body);
    if (updates) {
      res.status(200).json(updates);
    } else {
      res.status(404).json({ message: "Budget cannot be found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating the budget" });
  }
});

module.exports = server;
