import express from "express";
import { Savings, validateSavings } from "../models/savings.js";
import { protect } from "../middleware/auth.js";
const router = express.Router(); 

router.post("/", protect, async (req, res) => {
	try {
		const { error } = validateSavings(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const savings = new Savings({
			userId: req.user._id,
			goalName: req.body.goalName,
			targetAmount: req.body.targetAmount,
			savedAmount: req.body.savedAmount || 0, 
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			status: req.body.status || "Ongoing",
		});

		await savings.save();
		res.status(201).send({ message: "Savings goal added successfully", savings });
	} catch (error) {
		console.error("Error adding savings goal:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", protect, async (req, res) => {
    try {

		const savings = await Savings.find({ userId: req.user._id });
		
		if (!savings.length) {
			return res.status(404).json({ message: "No savings goals found" });
		}
		
        res.json(savings); 
    } catch (error) {
        console.error("Error fetching savings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
