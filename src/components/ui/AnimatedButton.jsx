import { motion } from "framer-motion";

export default function Button({ label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-cyan-500/40"
    >
      {/* Shine effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
