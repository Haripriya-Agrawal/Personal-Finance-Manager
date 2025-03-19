import mongoose from "mongoose";
import Joi from "joi";

const transactionSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
	amount: { type: Number, required: true },
	category: { type: String, required: true },
	date: { type: Date, default: () => new Date() }, 
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

const validateTransaction = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		amount: Joi.number().positive().required().label("Amount"),
		category: Joi.string().required().label("Category"),
		date: Joi.date().label("Date"),
	});
	return schema.validate(data);
};

// Export in ES module format
export { Transaction, validateTransaction };
