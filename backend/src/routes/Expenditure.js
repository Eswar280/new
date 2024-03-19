const { addExpenditure } = require("../controllers/ExpenditureController");
const express = require("express");
const Router = express.Router();

Router.post("/add/Expenditure", addExpenditure);

module.exports = Router;
