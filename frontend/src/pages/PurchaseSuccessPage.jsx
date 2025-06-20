import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

export default function PurchaseSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  console.log("🔍 session_id in URL:", sessionId);

 const handleCheckoutSuccess = async (sessionId) => {
	try {
		const res = await axios.post("/payments/checkout-success", { sessionId });
		console.log("✅ Success response:", res.data);

		if (res.data.success) {
			clearCart();
		} else {
			setError(res.data.message || "Unknown error during booking confirmation.");
		}
	} catch (error) {
		console.error("❌ Error confirming booking:", error);
		setError("Something went wrong confirming your booking.");
	} finally {
		setIsProcessing(false);
	}
};

  if (sessionId) {
    handleCheckoutSuccess(sessionId);
  } else {
    setIsProcessing(false);
    setError("No session ID found in the URL");
  }
}, [clearCart]);


  if (isProcessing) {
    return <div className="text-center mt-20 text-[#2B2B2B]">Processing your booking...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFAF8] flex items-center justify-center px-4 relative">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        numberOfPieces={400}
        recycle={false}
        style={{ zIndex: 20 }}
      />

      <div className="bg-white border shadow-md rounded-md p-8 max-w-md w-full relative z-30">
        <h1 className="text-2xl font-bold text-center text-[#2B2B2B] mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-center text-sm text-[#555] mb-1">
          Thank you for trusting us with your event.
        </p>
        <p className="text-center text-sm text-[#D9A5B3] mb-6">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="bg-[#FFF4F7] border border-[#F3D4DB] p-4 rounded mb-6">
          <div className="flex justify-between text-sm text-[#2B2B2B] mb-1">
            <span>Booking Reference</span>
            <span className="font-medium">#EVT12345</span>
          </div>
          <div className="flex justify-between text-sm text-[#2B2B2B]">
            <span>Rental Dates</span>
            <span>Check Email</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            disabled
            className="w-full bg-[#D9A5B3] text-white font-semibold py-2 px-4 rounded hover:bg-[#c88a99] transition"
          >
            We're prepping for your event!
          </button>
          <Link
            to="/services"
            className="w-full block text-center border border-[#D9A5B3] text-[#D9A5B3] font-semibold py-2 px-4 rounded hover:bg-[#f4e5e9] transition"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
