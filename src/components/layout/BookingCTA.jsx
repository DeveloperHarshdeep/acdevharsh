import Button from "../ui/AnimatedButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BookingCTA() {
  return (
    <motion.section
      className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 py-24 text-center text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Fix Your AC?</h2>
      <p className="mb-8 text-lg md:text-xl">
        Book a professional AC service now and enjoy cool comfort instantly.
      </p>
      <Link to="/booking">
        <Button label="Book Now" />
      </Link>
    </motion.section>
  );
}
