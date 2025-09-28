import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/AnimatedButton.jsx";
import ServicesSection from "../components/layout/ServicesSection.jsx";
import BookingCTA from "../components/layout/BookingCTA.jsx";
import Testimonials from "../components/layout/Testimonials.jsx";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left py-32 px-6 md:px-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-200 blur-3xl opacity-40"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-sky-300 blur-3xl opacity-40"
          animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left Content */}
        <div className="relative z-10 max-w-xl">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Reliable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400">
              AC Service
            </span>{" "}
            at Your Doorstep
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Book expert AC repair & maintenance with just one click.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/booking">
              <Button label="Book AC Service" onClick={() => {}} />
            </Link>
          </motion.div>
        </div>

        {/* Right 3D Floating Hero Image */}
        <motion.div
          className="relative z-10 mt-16 md:mt-0 md:ml-16 perspective-1000"
          initial={{ opacity: 0, rotateY: 20, x: 50 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          whileHover={{ rotateY: 15, scale: 1.05 }}
        >
          <motion.img
            src={heroImg}
            alt="AC Technician"
            className="w-full max-w-md drop-shadow-2xl rounded-3xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Booking CTA Section */}
      <BookingCTA />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA */}
      <section className="relative py-32 px-6 md:px-16 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Book your AC service in seconds and enjoy a cool, comfortable home.
        </motion.p>
        <Link to="/booking">
          <Button label="Book Now" />
        </Link>
      </section>
    </div>
  );
}
