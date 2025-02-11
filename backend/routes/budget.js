const express = require("express");
const { Budget, validateBudget } = require("../models/budget");

const router = express.Router();

// Add Budget
router.post("/", async (req, res) => {
	const { error } = validateBudget(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const budget = new Budget(req.body);
	await budget.save();
	res.send(budget);
});

// Get Budgets for a User
router.get("/:userId", async (req, res) => {
	const budgets = await Budget.find({ userId: req.params.userId });
	res.send(budgets);
});

module.exports = router;
