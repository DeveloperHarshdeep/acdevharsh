// src/pages/Booking.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Booking page (frontend-only)
 * - Assumes backend endpoints:
 *   POST /api/send-otp   -> { success: true }  (sends OTP to phone)
 *   POST /api/verify-otp -> { success: true }  (verifies OTP)
 *   POST /api/create-order -> returns Razorpay order object { id, amount, currency }
 *
 * Replace RAZORPAY_KEY with your key ID and backend URLs as needed.
 */

const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY_ID"; // <-- replace with your Razorpay Key ID

const steps = [
  {
    step: "1",
    title: "Enter details",
    text: "Tell us who you are and what service you need.",
  },
  {
    step: "2",
    title: "Verify phone",
    text: "We’ll send a one-time OTP to your phone number.",
  },
  {
    step: "3",
    title: "Pay & Confirm",
    text: "Complete a small advance payment to lock the booking.",
  },
];

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "AC Installation",
    date: "",
    time: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [successData, setSuccessData] = useState(null); // store payment response
  const [error, setError] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    // cleanup for timers if any
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Resend timer countdown
  useEffect(() => {
    let id;
    if (resendTimer > 0) {
      id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(id);
  }, [resendTimer]);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // Basic phone validation (Indian style) - adjust as needed
  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  // Send OTP (calls backend)
  const sendOtp = async () => {
    setError("");
    if (!isValidPhone(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setSendingOtp(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setResendTimer(60); // 60 seconds for resend
      } else {
        throw new Error(data.message || "OTP service returned error");
      }
    } catch (err) {
      console.error(err);
      setError("Could not send OTP. Check backend or phone number.");
    } finally {
      if (isMounted.current) setSendingOtp(false);
    }
  };

  // Verify OTP (calls backend)
  const verifyOtp = async () => {
    setError("");
    if (!otp || otp.trim().length < 3) {
      setError("Please enter the OTP sent to your phone.");
      return;
    }
    setVerifyingOtp(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, otp }),
      });
      if (!res.ok) throw new Error("Failed to verify OTP");
      const data = await res.json();
      if (data.success) {
        setVerified(true);
        setError("");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Try again.");
    } finally {
      if (isMounted.current) setVerifyingOtp(false);
    }
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  // Create order on backend and open Razorpay
  const handlePayment = async () => {
    setError("");
    if (!form.name || !form.email || !form.date || !form.time) {
      setError("Please fill name, email, date and time before paying.");
      return;
    }
    if (!verified) {
      setError("Please verify your phone number with OTP before paying.");
      return;
    }
    setLoadingOrder(true);

    try {
      // 1) create order on backend
      // Replace /api/create-order with your endpoint. Body can include details for order metadata.
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 99, // INR: booking advance amount (example: ₹99). Backend should multiply by 100.
          metadata: {
            customerName: form.name,
            phone: form.phone,
            email: form.email,
            service: form.service,
            date: form.date,
            time: form.time,
          },
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");
      const order = await orderResponse.json(); // expected { id, amount, currency, ... }

      // 2) load Razorpay SDK
      await loadRazorpayScript();

      // 3) prepare options
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount || orderAmountInPaise(order), // paise
        currency: order.currency || "INR",
        name: "AC Services Booking",
        description: `Booking advance for ${form.service}`,
        order_id: order.id, // Razorpay order id from backend
        handler: function (response) {
          // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
          // You should verify payment on backend ideally (for production)
          setSuccessData({
            payment: response,
            orderMeta: order,
            customer: { ...form },
          });
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#0ea5e9", // Tailwind sky-400
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        setError("Payment failed or was cancelled.");
        console.error("Payment failed", resp);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Payment initiation failed. Check backend and Razorpay key.");
    } finally {
      if (isMounted.current) setLoadingOrder(false);
    }
  };

  const orderAmountInPaise = (order) => {
    // fallback helper
    if (!order || !order.amount) return 9900;
    return order.amount;
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "AC Installation",
      date: "",
      time: "",
    });
    setOtp("");
    setOtpSent(false);
    setVerified(false);
    setResendTimer(0);
    setSuccessData(null);
    setError("");
  };

  // Small animated confetti component (CSS-only pieces)
  const Confetti = () => (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 0.8;
          const duration = 2 + Math.random() * 2.5;
          const rotate = Math.random() * 360;
          return (
            <motion.div
              key={i}
              initial={{ y: -50, opacity: 0, rotate: 0 }}
              animate={{ y: 700, opacity: 1, rotate: rotate }}
              transition={{
                delay,
                duration,
                ease: "easeIn",
              }}
              style={{
                left: `${left}%`,
                top: "-10%",
              }}
              className="absolute"
            >
              <div
                style={{
                  width: 10 + Math.random() * 12,
                  height: 6 + Math.random() * 10,
                }}
                className="rounded-sm"
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      ["#06b6d4", "#3b82f6", "#fb7185", "#f97316", "#a78bfa"][
                        Math.floor(Math.random() * 5)
                      ],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Decorative floating shapes */}
      <div className="absolute left-[-80px] top-20 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-200 to-blue-200 opacity-30 blur-3xl transform -rotate-12 pointer-events-none" />
      <div className="absolute right-[-80px] bottom-40 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-200 to-violet-200 opacity-30 blur-3xl pointer-events-none" />

      {/* Hero */}
      <header className="relative z-10 py-20 px-6 text-center">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          Book a Service — Real Customers Only
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="max-w-2xl mx-auto mt-4 text-gray-700"
        >
          Quick booking with phone verification + small advance payment. Reduces fake
          bookings and increases reliability.
        </motion.p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        {/* Steps */}
        <section className="grid gap-8 md:grid-cols-3 mb-12">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6, type: "spring" }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform-gpu"
            >
              <div className="mx-auto w-14 h-14 mb-4 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.text}</p>
            </motion.div>
          ))}
        </section>

        {/* Form + visual card */}
        <section className="grid gap-8 md:grid-cols-2 items-start">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill details, verify phone via OTP, and pay a small advance to
              confirm your booking.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePayment();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone number</label>
                <div className="flex gap-3">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile"
                    className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={sendingOtp || resendTimer > 0}
                    className={`px-4 py-3 rounded-xl text-white font-medium ${
                      sendingOtp
                        ? "bg-gray-400 cursor-not-allowed"
                        : resendTimer > 0
                        ? "bg-yellow-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {sendingOtp ? "Sending..." : resendTimer > 0 ? `Resend (${resendTimer}s)` : "Send OTP"}
                  </button>
                </div>
              </div>

              {otpSent && !verified && (
                <div>
                  <label className="block text-sm font-medium mb-1">Enter OTP</label>
                  <div className="flex gap-3">
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="4-6 digit code"
                      className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifyingOtp}
                      className={`px-4 py-3 rounded-xl text-white font-medium ${
                        verifyingOtp ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {verifyingOtp ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}

              {verified && (
                <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                  <div>
                    <div className="text-sm font-semibold">Phone verified</div>
                    <div className="text-xs text-gray-600">We will use this number to contact you.</div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option>AC Installation</option>
                  <option>AC Repair</option>
                  <option>AC Maintenance</option>
                  <option>Gas Refilling</option>
                  <option>AC Cleaning</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred date</label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred time</label>
                  <input
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </div>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={!verified || loadingOrder}
                  className={`w-full px-5 py-3 rounded-2xl text-white font-semibold shadow-lg ${
                    !verified || loadingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-102 transform transition"
                  }`}
                >
                  {loadingOrder ? "Preparing payment..." : "Confirm & Pay ₹99"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We take a small refundable advance to prevent fake bookings. Full payment can be done to the technician.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Right visual card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 bg-gradient-to-b from-white via-sky-50 to-white shadow-xl"
          >
            <div className="rounded-2xl overflow-hidden border border-gray-100 p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  AC
                </div>
                <div>
                  <div className="text-lg font-semibold">{form.service}</div>
                  <div className="text-sm text-gray-500">Trusted technicians • Easy booking</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Customer</div>
                  <div className="font-medium">{form.name || "Your name"}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Phone</div>
                  <div className="font-medium">{form.phone || "—"}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Date</div>
                  <div className="font-medium">{form.date || "Select date"}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>Time</div>
                  <div className="font-medium">{form.time || "Select time"}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs text-gray-500 mb-2">Why pay an advance?</div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Reduces fake bookings</li>
                  <li>• Priority scheduling</li>
                  <li>• Secure payment via Razorpay</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {successData && (
          <>
            <Confetti />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 text-center">
                <div className="mb-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-teal-400 text-white flex items-center justify-center text-3xl font-bold">
                    ✓
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Booking Confirmed</h3>
                <p className="text-gray-600 mb-4">
                  Thank you, {successData.customer?.name || "customer"}! Your
                  booking is confirmed. Payment successful.
                </p>

                <div className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="flex justify-between">
                    <div>Order ID</div>
                    <div className="font-medium text-right">{successData.orderMeta?.id || "—"}</div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>Payment ID</div>
                    <div className="font-medium text-right">{successData.payment?.razorpay_payment_id || "—"}</div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      // close modal & reset form or keep as is
                      setSuccessData(null);
                      resetForm();
                    }}
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => setSuccessData(null)}
                    className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
