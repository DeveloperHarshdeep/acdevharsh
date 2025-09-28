// src/pages/FAQ.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  { q: "How often should I service my AC?", a: "We recommend a full service once a year for most users. Heavy usage or dusty environments may require twice-yearly checks." },
  { q: "Do you service all brands?", a: "Yes — our technicians are trained across major brands like Daikin, LG, Samsung, Voltas, Whirlpool and more." },
  { q: "How long does a service take?", a: "A typical full service for a split AC takes 60–90 minutes depending on the unit and condition." },
  { q: "What payment methods do you accept?", a: "We accept Razorpay online payments, UPI, and cash to the technician. Advance payments help prevent fake bookings." },
  { q: "Do you provide warranty on repairs?", a: "Yes — we provide a limited warranty on parts and labor depending on the repair. Warranty details will be shared on the invoice." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.header initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">Frequently Asked Questions</h1>
          <p className="mt-3 text-gray-700">Answers to common questions about services, pricing and scheduling.</p>
        </motion.header>

        <section className="mt-10 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl shadow p-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center gap-4"
                >
                  <div className="text-left">
                    <div className="font-semibold">{f.q}</div>
                    <div className="text-xs text-gray-500 mt-1">Tap to {isOpen ? "collapse" : "expand"}</div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOpen ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                <motion.div initial={{ height: 0, opacity: 0 }} animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden mt-3 text-gray-700">
                  <div className="leading-relaxed">{f.a}</div>
                </motion.div>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-12 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-600">Contact our support or call the booking line for urgent clarifications.</p>
          <div className="mt-4">
            <a href="/contact" className="px-4 py-2 rounded-xl bg-blue-600 text-white">Contact Support</a>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Extra reading</h3>
          <p className="text-gray-600 mt-2">Read our blog for tips on energy saving, AC troubleshooting and seasonal maintenance guides (coming soon).</p>
        </section>
      </div>
    </div>
  );
}
