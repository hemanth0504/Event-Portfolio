import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	total: 0,
	subtotal: 0,

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error.response?.data?.message || "Failed to fetch cart");
		}
	},

	clearCart: async () => {
	try {
		await axios.delete("/cart", { data: {} }); // or "/cart/clear" if you added that

		// ✅ Manually reset the state
		set({ cart: [], total: 0, subtotal: 0 });
	} catch (error) {
		toast.error("Failed to clear cart");
	}
},


	addToCart: async ({ productId, rentalStart, rentalEnd }) => {
		try {
			const res = await axios.post("/cart", {
				productId,
				rentalStart,
				rentalEnd,
			});

			toast.success("Product added to cart");

			// After adding to cart, fetch updated cart from backend
			await get().getCartItems();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to add to cart");
		}
	},

	removeFromCart: async (productId, rentalStart, rentalEnd) => {
		try {
			await axios.delete(`/cart`, {
				data: { productId, rentalStart, rentalEnd },
			});

			await get().getCartItems();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to remove from cart");
		}
	},

	updateQuantity: async (productId, quantity, rentalStart, rentalEnd) => {
		if (quantity === 0) {
			get().removeFromCart(productId, rentalStart, rentalEnd);
			return;
		}

		try {
			await axios.put(`/cart/${productId}`, {
				quantity,
				rentalStart,
				rentalEnd,
			});

			await get().getCartItems();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update quantity");
		}
	},

	calculateTotals: () => {
		const { cart } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		const total = subtotal;
		set({ subtotal, total });
	},
}));
