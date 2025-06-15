import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true, // e.g., "sofa", "garland", "backdrop"
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		pricePerDay: {
			type: Number,
			required: true,
			min: 0,
		},
		stock: {
			type: Number,
			required: true,
			min: 1,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		isAvailable: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
