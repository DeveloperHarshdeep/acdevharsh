// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Decorative */}
      <div className="absolute left-[-80px] top-12 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-200 to-blue-200 opacity-20 blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <motion.header
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
            About Our AC Services
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            We blend technical expertise with a customer-first approach. From installations to preventive maintenance,
            our mission is simple: keep you cool, comfortable and worry-free.
          </p>
        </motion.header>

        {/* Mission + Vision */}
        <section className="mt-12 grid gap-8 md:grid-cols-2 items-start">
          <motion.div
            whileHover={{ rotateX: 4, rotateY: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 160 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Deliver dependable AC services that combine speed, transparency, and excellent workmanship. We aim to reduce
              downtime, lower energy bills for our customers, and provide clear, honest pricing.
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li>• Fast response & same-day rescue</li>
              <li>• Certified technicians</li>
              <li>• Original spare parts & best practices</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ rotateX: 4, rotateY: 6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 160 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted AC service provider in our region — known for credibility, safety and long-term relationships
              with customers and businesses.
            </p>
            <p className="mt-3 text-gray-600">
              We invest in training, tools, and processes so you get predictable, high-quality results every time.
            </p>
          </motion.div>
        </section>

        {/* Timeline / Storytelling */}
        <section className="mt-16">
          <h3 className="text-3xl font-bold mb-6">Our Story</h3>

          <div className="space-y-8">
            {[
              {
                year: "2015",
                title: "Humble beginnings",
                text: "Started as a 2-person team servicing local homes. Early focus: honesty & fast response.",
              },
              {
                year: "2018",
                title: "Growing trust",
                text: "Added certified technicians and standardized processes. Began servicing small businesses.",
              },
              {
                year: "2021",
                title: "Scaling for quality",
                text: "Invested in training, diagnostic tools and a simple booking system to reduce no-shows and delays.",
              },
              {
                year: "2024",
                title: "Customer-first approach",
                text: "Implemented phone verification + token advance to ensure real customer bookings and better scheduling.",
              },
            ].map((item, i) => (
              <motion.article
                key={i}
                initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-6 shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white flex items-center justify-center font-bold text-lg">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-gray-600 mt-2">{item.text}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mt-16">
          <h3 className="text-3xl font-bold mb-6">Meet the Team</h3>
          <p className="text-gray-600 mb-6">Certified technicians & customer support — trained to deliver fast, safe work.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Amit Singh", role: "Lead Technician", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
              { name: "Priya Sharma", role: "Customer Success", img: "https://images.unsplash.com/photo-1545996124-1b7afc5dbb6a" },
              { name: "Rohit Kumar", role: "Field Technician", img: "https://images.unsplash.com/photo-1546456073-6712f79251bb" },
              { name: "Sanjay Verma", role: "Operations", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c" },
            ].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, rotateX: 4 }}
                transition={{ type: "spring", stiffness: 160 }}
                className="bg-white rounded-2xl shadow p-4 text-center"
              >
                <div className="w-full h-44 overflow-hidden rounded-xl mb-4">
                  <img src={p.img + "?auto=format&fit=crop&w=800&q=60"} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-lg font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">{p.role}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values / Why Choose Us */}
        <section className="mt-16 bg-gradient-to-r from-sky-50 to-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Why customers pick us</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Transparent Pricing", text: "No hidden fees. You approve before work begins." },
              { title: "Quality Parts", text: "We use manufacturer-approved parts for durability." },
              { title: "Satisfaction Guarantee", text: "If it’s not right, we come back and fix it." },
            ].map((v, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="bg-white p-4 rounded-xl shadow">
                <h4 className="font-semibold">{v.title}</h4>
                <p className="text-gray-600 mt-2">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section className="mt-12 text-center" whileHover={{ scale: 1.01 }}>
          <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg">
            <div className="text-xl font-bold">Ready to schedule a service?</div>
            <div className="mt-2 text-sm">Book now and get priority scheduling</div>
            <div className="mt-4">
              <a href="/booking" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">Book Now</a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
