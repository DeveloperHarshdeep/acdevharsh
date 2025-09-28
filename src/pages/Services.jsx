import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Services = () => {
  const services = [
    {
      title: "AC Installation",
      description:
        "Professional AC installation for homes, offices, and commercial spaces. Ensuring proper setup, energy efficiency, and maximum cooling performance.",
      img: "https://images.pexels.com/photos/3964717/pexels-photo-3964717.jpeg", // technician installing AC
    },
    {
      title: "AC Repair",
      description:
        "From unusual noises to cooling issues, we diagnose and repair all AC problems with genuine spare parts and same-day service.",
      img: "https://images.pexels.com/photos/6466289/pexels-photo-6466289.jpeg", // repairman fixing AC
    },
    {
      title: "AC Maintenance",
      description:
        "Increase lifespan & efficiency with regular maintenance. Our AMC plans give you worry-free service all year round.",
      img: "https://images.pexels.com/photos/5591412/pexels-photo-5591412.jpeg", // maintenance check
    },
    {
      title: "Gas Refilling",
      description:
        "We use eco-friendly, high-quality refrigerants to restore cooling efficiency and peak performance.",
      img: "https://images.pexels.com/photos/6474456/pexels-photo-6474456.jpeg", // technician with tools
    },
    {
      title: "AC Cleaning",
      description:
        "Deep cleaning of filters, coils, and ducts ensures fresh, healthy, and efficient air circulation.",
      img: "https://images.pexels.com/photos/5591636/pexels-photo-5591636.jpeg", // cleaning AC filters
    },
  ];

  return (
    <div className="relative bg-gray-50 text-gray-900 overflow-hidden">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping"></div>

      {/* Hero Section */}
      <section className="relative z-10 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mt-6 text-gray-700"
        >
          Complete AC solutions: installation, repair, maintenance, and cleaning.
          We keep your spaces cool, fresh, and comfortable.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={800}
              className="rounded-2xl bg-white shadow-xl hover:shadow-3xl overflow-hidden relative group"
            >
              <motion.img
                src={service.img}
                alt={service.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              {/* Overlay Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="p-6 relative z-10">
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </section>

      {/* Detailed Info */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-16">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-700 leading-relaxed">
            Years of expertise, transparency, and reliable solutions for all AC
            needs. With state-of-the-art equipment and skilled professionals, we
            deliver comfort and efficiency that lasts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Annual Maintenance Contracts
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Stay worry-free with our AMC plans. Regular checkups, priority
            support, and preventive maintenance ensure your AC performs at its
            best while saving long-term costs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Expert Technicians</h2>
          <p className="text-gray-700 leading-relaxed">
            Our skilled technicians handle all leading brands including Daikin,
            LG, Samsung, Voltas, Whirlpool, and more. Professionalism and
            efficiency are guaranteed every time.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center overflow-hidden">
        {/* Floating background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute top-10 left-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl"
          ></motion.div>
          <motion.div
            animate={{ x: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute bottom-10 right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"
          ></motion.div>
        </div>

        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 relative z-10"
        >
          Need AC Service Today?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg mb-8 relative z-10"
        >
          Call our team and book your appointment with just one click.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition relative z-10"
        >
          Book Now
        </motion.button>
      </section>
    </div>
  );
};

export default Services;
