import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-[-150px] left-[-150px] h-[400px] w-[400px] rounded-full bg-pink-400 opacity-40 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-indigo-400 opacity-40 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative w-[380px] rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl p-8 border border-white/20 overflow-hidden"
      >
        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          style={{ filter: "blur(15px)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-center text-white mb-2 drop-shadow-lg"
          >
            Admin Login 👨‍💻
          </motion.h2>

          <p className="text-center text-sm text-gray-200 mb-6">
            Enter your credentials to manage the dashboard.
          </p>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-200 mb-1">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-gray-200 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              text-white font-semibold shadow-lg overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
