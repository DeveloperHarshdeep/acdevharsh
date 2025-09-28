import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 md:px-16 py-28 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">
        Privacy Policy
      </h1>
      <p className="mb-6 text-lg">
        At AC Service, we respect your privacy and are committed to protecting your personal information.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address, phone number, and service requests to provide you with our services efficiently.
      </p>
      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <p className="mb-4">
        Your information is used to book services, communicate with you, improve our offerings, and ensure smooth transactions.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
      <p className="mb-4">
        We use trusted third-party services like Razorpay for payment processing. They follow strict privacy and security guidelines.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Security</h2>
      <p className="mb-4">
        We implement security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on this page with the updated date.
      </p>
    </motion.div>
  );
}
