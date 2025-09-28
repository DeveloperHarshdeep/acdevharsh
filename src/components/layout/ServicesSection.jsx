import { motion } from "framer-motion";
import { Card } from "flowbite-react";
import { FaSnowflake, FaTools, FaCogs, FaRegClock } from "react-icons/fa";

const services = [
  {
    title: "AC Installation",
    icon: <FaCogs size={36} className="text-cyan-500" />,
    description: "Professional AC installation for homes & offices with guaranteed safety.",
  },
  {
    title: "AC Repair",
    icon: <FaTools size={36} className="text-cyan-500" />,
    description: "Fast and reliable AC repair services to get your cooling back in no time.",
  },
  {
    title: "Maintenance",
    icon: <FaRegClock size={36} className="text-cyan-500" />,
    description: "Regular AC maintenance plans for longevity & optimal performance.",
  },
  {
    title: "Cooling Optimization",
    icon: <FaSnowflake size={36} className="text-cyan-500" />,
    description: "Optimize AC system for maximum cooling with minimal energy usage.",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-gray-50 py-28 px-6 md:px-16 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="cursor-pointer"
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          >
            <Card className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 hover:rotate-1 transition-all duration-500">
              <div className="flex items-center justify-center mb-5">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-3">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
