import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className="min-h-screen bg-[#FFFAF8] flex items-center justify-center px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-white border shadow-md rounded-md p-8 relative z-10"
			>
				<div className="flex justify-center mb-4">
					<XCircle className="text-red-500 w-16 h-16" />
				</div>
				<h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
					Booking Cancelled
				</h1>
				<p className="text-center text-[#2B2B2B] text-sm mb-6">
					Your event booking was cancelled. No charges have been made.
				</p>

				<div className="bg-[#FFF4F7] border border-[#F3D4DB] p-4 rounded mb-6">
					<p className="text-sm text-center text-[#555]">
						If something went wrong or you need help, feel free to contact our support team.
					</p>
				</div>

				<Link
					to="/services"
					className="w-full block text-center border border-[#D9A5B3] text-[#D9A5B3] font-semibold py-2 px-4 rounded hover:bg-[#f4e5e9] transition"
				>
					<ArrowLeft className="inline-block mr-2" size={18} />
					Back to Services
				</Link>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;
