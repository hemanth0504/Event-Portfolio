import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
				rentalStart: {
					type: Date,
					required: true,
				},
				rentalEnd: {
					type: Date,
					required: true,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "completed", "cancelled"],
			default: "pending",
		},
		stripeSessionId: {
			type: String,
			unique: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
