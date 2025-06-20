import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { format, differenceInCalendarDays } from "date-fns";

const stripePromise = loadStripe("pk_test_51RbcytQcAxs4k5fH4yicH6trl4fbueF754CVm2bXTlqBNwTkHD4GfMerjNLaWJY2g54vnwvqW8qxtqUKqD8gLOl200wVrkv2PT");

const OrderSummary = () => {
	const { cart } = useCartStore();
	const [isLoading, setIsLoading] = useState(false);

	const detailedItems = cart.map((item) => {
		const days =
			differenceInCalendarDays(new Date(item.rentalEnd), new Date(item.rentalStart)) + 1;
		const itemTotal = item.pricePerDay * item.quantity * days;
		return {
			...item,
			days,
			itemTotal,
		};
	});

	const subtotal = detailedItems.reduce((sum, item) => sum + item.itemTotal, 0);
	const formattedSubtotal = subtotal.toFixed(2);

	const handlePayment = async () => {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const stripe = await stripePromise;
			const res = await axios.post("/payments/create-checkout-session", {
				products: cart,
			});
			const session = res.data;

			const result = await stripe.redirectToCheckout({ sessionId: session.id });
			if (result.error) {
				console.error("Stripe error:", result.error.message);
			}
		} catch (error) {
			console.error("Checkout error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.div
			className='rounded-lg border border-[#E4D4D4] bg-white p-6 shadow-sm space-y-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h2 className='text-xl font-semibold text-[#2B2B2B]'>Order Summary</h2>

			<div className='divide-y divide-gray-200 max-h-80 overflow-y-auto pr-2'>
				{detailedItems.map((item) => (
					<div
						key={`${item._id}-${item.rentalStart}-${item.rentalEnd}`}
						className='py-4 space-y-1'
					>
						<p className='font-medium text-sm text-[#2B2B2B]'>{item.name}</p>
						<p className='text-xs text-gray-500'>
							{format(new Date(item.rentalStart), "MMM d")} →{" "}
							{format(new Date(item.rentalEnd), "MMM d, yyyy")} ({item.days} days)
						</p>
						<p className='text-xs text-gray-500'>
							{item.quantity} × ${item.pricePerDay}/day ={" "}
							<span className='text-[#D9A5B3] font-semibold'>
								${item.itemTotal.toFixed(2)}
							</span>
						</p>
					</div>
				))}
			</div>

			<div className='border-t pt-4'>
				<div className='flex items-center justify-between text-base font-semibold'>
					<span className='text-[#2B2B2B]'>Total</span>
					<span className='text-[#D9A5B3]'>${formattedSubtotal}</span>
				</div>
			</div>

			<motion.button
				disabled={isLoading}
				className={`w-full rounded-md px-5 py-2.5 text-sm font-medium text-white transition ${
					isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#D9A5B3] hover:bg-[#c88a99]"
				}`}
				whileHover={{ scale: isLoading ? 1 : 1.03 }}
				whileTap={{ scale: isLoading ? 1 : 0.98 }}
				onClick={handlePayment}
			>
				{isLoading ? "Redirecting..." : "Proceed to Checkout"}
			</motion.button>

			<div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
				<span>or</span>
				<Link
					to='/services'
					className='text-[#D9A5B3] underline hover:text-[#c88a99] hover:no-underline'
				>
					Continue Shopping <MoveRight size={16} className='inline ml-1' />
				</Link>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
