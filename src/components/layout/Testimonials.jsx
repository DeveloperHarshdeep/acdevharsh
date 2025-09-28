import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    name: "Ravi K.",
    role: "Homeowner",
    feedback: "Fast, professional, and friendly AC service!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Neha S.",
    role: "Business Owner",
    feedback: "My AC has never worked better. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Amit P.",
    role: "Manager",
    feedback: "Reliable service, on time, and affordable.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Priya M.",
    role: "Designer",
    feedback: "Technician was super knowledgeable and quick!",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Siddharth R.",
    role: "Engineer",
    feedback: "Easy booking, fair pricing, excellent support.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="bg-gradient-to-b from-sky-50 to-indigo-50 py-20 px-6 md:px-16 text-center">
      <motion.h2
        className="text-4xl font-bold mb-6 text-gray-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Our <span className="text-indigo-600">Clients Say</span>
      </motion.h2>
      <p className="text-gray-600 mb-16">
        Don’t just take our word for it. Here’s what our clients have to say
        about working with us.
      </p>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-10 relative"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                “
              </motion.div>
            </div>

            <p className="text-gray-700 text-lg mb-6 italic">
              "{testimonials[current].feedback}"
            </p>

            <div className="flex justify-center text-yellow-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-[-3rem] top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-gray-100"
        >
          <HiChevronLeft className="text-2xl text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-[-3rem] top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-gray-100"
        >
          <HiChevronRight className="text-2xl text-gray-700" />
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-indigo-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
