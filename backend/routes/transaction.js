const express = require("express");
const { Transaction, validateTransaction } = require("../models/transaction");

const router = express.Router();

// Add Transaction
router.post("/", async (req, res) => {
	const { error } = validateTransaction(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const transaction = new Transaction(req.body);
	await transaction.save();
	res.send(transaction);
});

// Get Transactions for a User
router.get("/:userId", async (req, res) => {
	const transactions = await Transaction.find({ userId: req.params.userId }).sort({ date: -1 });
	res.send(transactions);
});

module.exports = router;
