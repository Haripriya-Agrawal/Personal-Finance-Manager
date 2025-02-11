const express = require("express");
const { Savings, validateSavings } = require("../models/savings");

const router = express.Router();

// Add Saving Goal
router.post("/", async (req, res) => {
	const { error } = validateSavings(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const savings = new Savings(req.body);
	await savings.save();
	res.send(savings);
});

// Get Savings for a User
router.get("/:userId", async (req, res) => {
	const savings = await Savings.find({ userId: req.params.userId }).sort({ startDate: -1 });
	res.send(savings);
});

module.exports = router;
