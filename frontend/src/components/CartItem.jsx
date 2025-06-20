import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { format, differenceInCalendarDays } from "date-fns";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	const handleDecrease = () => {
		updateQuantity(item._id, item.quantity - 1, item.rentalStart, item.rentalEnd);
	};

	const handleIncrease = () => {
		updateQuantity(item._id, item.quantity + 1, item.rentalStart, item.rentalEnd);
	};

	const handleRemove = () => {
		removeFromCart(item._id, item.rentalStart, item.rentalEnd);
	};

	const days =
		differenceInCalendarDays(new Date(item.rentalEnd), new Date(item.rentalStart)) + 1;
	const totalPrice = item.pricePerDay * item.quantity * days;

	return (
		<div className="rounded-lg border p-4 shadow-sm border-gray-200 bg-white md:p-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
				{/* Left: Image */}
				<div className="w-full md:w-auto md:order-1">
					<img
						src={item.image}
						alt={item.name}
						className="h-24 w-24 object-cover rounded-md"
					/>
				</div>

				{/* Middle: Info */}
				<div className="flex-1 space-y-2 md:order-2">
					<p className="text-base font-semibold text-[#2B2B2B]">{item.name}</p>
					<p className="text-sm text-gray-500">{item.description}</p>
					<p className="text-sm text-gray-600">
						Rental:{" "}
						<span className="font-medium text-[#2B2B2B]">
							{format(new Date(item.rentalStart), "MMM d")} -{" "}
							{format(new Date(item.rentalEnd), "MMM d, yyyy")}
						</span>{" "}
						({days} day{days > 1 ? "s" : ""})
					</p>
					<button
						onClick={handleRemove}
						className="text-sm text-red-500 hover:underline"
					>
						<Trash size={14} className="inline mr-1" />
						Remove
					</button>
				</div>

				{/* Right: Quantity + Price */}
				<div className="flex flex-col items-end gap-3 md:order-3">
					<div className="flex items-center gap-2">
						<button
							className="h-6 w-6 flex items-center justify-center rounded border text-gray-700 bg-gray-100 hover:bg-gray-200"
							onClick={handleDecrease}
						>
							<Minus size={14} />
						</button>
						<p className="w-6 text-center text-sm font-medium">{item.quantity}</p>
						<button
							className="h-6 w-6 flex items-center justify-center rounded border text-white bg-[#D9A5B3] hover:bg-[#c88a99]"
							onClick={handleIncrease}
						>
							<Plus size={14} />
						</button>
					</div>

					<div className="text-right">
						<p className="text-xs text-gray-500">Total</p>
						<p className="text-base font-semibold text-[#D9A5B3]">
							${totalPrice.toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
