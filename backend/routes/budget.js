import express from "express";
import { Budget, validateBudget } from "../models/budget.js";
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

export default router;
