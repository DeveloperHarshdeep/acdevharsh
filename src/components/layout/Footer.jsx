import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/AnimatedButton";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = [
    { title: "Home", url: "/" },
    { title: "Services", url: "/services" },
    { title: "Booking", url: "/booking" },
    { title: "About Us", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Pricing", url: "/pricing" },
    { title: "FAQ", url: "/faq" },
    { title: "Privacy Policy", url: "/privacy" },
    { title: "Terms & Conditions", url: "/terms" },
  ];

  return (
    <footer className="relative bg-gray-900 text-white pt-16 px-6 md:px-16 overflow-hidden">
      {/* Footer Top Section */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Branding */}
        <div>
          <h2 className="text-3xl font-bold mb-3">AC Service</h2>
          <p className="text-gray-400 mb-4">
            Reliable AC repair, installation, and maintenance at your doorstep.
          </p>
          <div className="flex space-x-4 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Menu */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2">
            {footerLinks.map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5, color: "#22d3ee" }}
                className="cursor-pointer transition-all"
              >
                <Link to={link.url}>{link.title}</Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact & Booking */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Get In Touch</h3>
          <p className="text-gray-400 mb-4">Email: harshdeepdeveloper@gmail.com</p>
          <p className="text-gray-400 mb-4">Contact: +91 7589434135, +91 6284004413</p>
          <div className="flex space-x-4">
            <Link to="/booking">
              <Button label="Book Service" />
            </Link>
            <a href="https://wa.me/917589434135?text=Hi%20Harshdeep,%20I%20am%20interested%20in%20your%20website%20development%20services.
">
              <Button label="Whatsapp Us" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <p className="text-center text-gray-500 mt-12">
        Demo By Developer Harsh &copy; 2025 AC Service. All rights reserved. 
      </p>

      {/* Click To Top Button */}
      {showTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-400 text-white p-4 rounded-full shadow-2xl z-50"
          whileHover={{ scale: 1.2, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </footer>
  );
}
