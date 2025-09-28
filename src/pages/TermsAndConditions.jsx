import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 md:px-16 py-28 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">
        Terms & Conditions
      </h1>
      <p className="mb-6 text-lg">
        By using AC Service, you agree to the following terms and conditions:
      </p>
      <h2 className="text-2xl font-semibold mb-4">Service Eligibility</h2>
      <p className="mb-4">
        You must be at least 18 years old and legally capable to enter into contracts to book our services.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Booking & Payments</h2>
      <p className="mb-4">
        All bookings are subject to confirmation. Payments are processed securely via Razorpay. Refunds are subject to our refund policy.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Service Limitations</h2>
      <p className="mb-4">
        We strive for quality service, but we are not liable for indirect damages or delays caused by circumstances beyond our control.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
      <p className="mb-4">
        All content on this website including text, images, and logos are owned by AC Service and protected by copyright laws.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes shall be resolved in accordance with Indian jurisdiction.
      </p>
    </motion.div>
  );
}
