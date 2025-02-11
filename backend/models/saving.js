const mongoose = require("mongoose");
const Joi = require("joi");

const savingsSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
	goalName: { type: String, required: true },
	targetAmount: { type: Number, required: true },
	currentAmount: { type: Number, default: 0 },
	endDate: { type: Date, required: true },
	status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
}, { timestamps: true });

const Savings = mongoose.model("savings", savingsSchema);

const validateSavings = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		goalName: Joi.string().required().label("Goal Name"),
		targetAmount: Joi.number().positive().required().label("Target Amount"),
		currentAmount: Joi.number().min(0).label("Current Amount"),
		endDate: Joi.date().required().label("EndDate"),
		status: Joi.string().valid("in-progress", "completed").label("Status"),
	});
	return schema.validate(data);
};

module.exports = { Savings, validateSavings };
