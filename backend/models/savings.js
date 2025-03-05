const mongoose = require("mongoose");
const Joi = require("joi");

// saving goal for buying new stuff
const savingsSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
	goalName: { type: String, required: true },
	targetAmount: { type: Number, required: true },
	savedAmount: { type: Number, default: 0 },
	endDate: { type: Date, required: true },
	status: { type: String, enum: ["Ongoing", "Upcoming", "Completed"], default: "Ongoing" },
}, { timestamps: true });

const Savings = mongoose.models.Savings || mongoose.model("Savings", savingsSchema);

const validateSavings = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		goalName: Joi.string().required().label("Goal Name"),
		targetAmount: Joi.number().positive().required().label("Target Amount"),
		savedAmount: Joi.number().min(0).label("Saved Amount"),
		endDate: Joi.date().required().label("EndDate"),
		status: Joi.string().valid("in-progress", "completed").label("Status"),
	});
	return schema.validate(data);
};

module.exports = { Savings, validateSavings };
