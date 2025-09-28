import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Booking", path: "/booking" },
    { name: "Pricing", path: "/pricing" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent animate-gradient hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          >
            AC Service
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 font-medium">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link
                to={link.path}
                className="text-gray-800 hover:text-sky-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
              {/* Glow underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 rounded-full transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_8px_#38bdf8]" />
            </motion.div>
          ))}
        </div>



        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 rounded-lg hover:bg-white/30 transition shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden bg-white/30 backdrop-blur-lg border-t border-white/30 shadow-xl"
          >
            <div className="flex flex-col space-y-6 px-6 py-6 text-center font-medium">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setIsOpen(false)}
                  className="relative group"
                >
                  <Link
                    to={link.path}
                    className="text-gray-800 hover:text-sky-500 transition-colors duration-300 text-lg"
                  >
                    {link.name}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 rounded-full transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_8px_#38bdf8]" />
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} onClick={() => setIsOpen(false)}>
                <Link to="/customer/login">
                  <Button className="w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-white shadow-lg hover:shadow-[0_0_20px_#38bdf8] transform transition-all duration-300 rounded-full py-3 text-lg">
                    Login
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
