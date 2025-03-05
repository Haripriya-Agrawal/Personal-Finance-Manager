const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
	amount: { type: Number, required: true },
	category: { type: String, required: true },
	date: { type: Date, default: Date.now },
}, { timestamps: true });

const Transaction = mongoose.model("transaction", transactionSchema);

const validateTransaction = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		amount: Joi.number().positive().required().label("Amount"),
		category: Joi.string().required().label("Category"),
		date: Joi.date().label("Date"),
	});
	return schema.validate(data);
};

module.exports = { Transaction, validateTransaction };
