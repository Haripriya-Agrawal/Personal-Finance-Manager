const mongoose = require("mongoose");
const Joi = require("joi");



// not required




const analyticsSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
	totalExpenses: { type: Number, default: 0 },
	largestExpense: {
		amount: { type: Number, default: 0 },
		category: { type: String },
		date: { type: Date }
	},
	budgetGoalsMet: { type: Number, default: 0 },
	dailySpendingTrends: [
		{ date: { type: Date }, amount: { type: Number } }
	],
	spendingHeatmap: { type: Map, of: Number },
	categoryWiseSpending: { type: Map, of: Number },
}, { timestamps: true });

const Analytics = mongoose.model("analytics", analyticsSchema);

const validateAnalytics = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		totalExpenses: Joi.number().min(0).label("Total Expenses"),
		largestExpense: Joi.object({
			amount: Joi.number().min(0).label("Amount"),
			category: Joi.string().label("Category"),
			date: Joi.date().label("Date"),
		}).label("Largest Expense"),
		budgetGoalsMet: Joi.number().min(0).label("Budget Goals Met"),
		dailySpendingTrends: Joi.array().items(
			Joi.object({ date: Joi.date().label("Date"), amount: Joi.number().label("Amount") })
		).label("Daily Spending Trends"),
		spendingHeatmap: Joi.object().pattern(Joi.string(), Joi.number()).label("Spending Heatmap"),
		categoryWiseSpending: Joi.object().pattern(Joi.string(), Joi.number()).label("Category-wise Spending"),
	});
	return schema.validate(data);
};

module.exports = { Analytics, validateAnalytics };
