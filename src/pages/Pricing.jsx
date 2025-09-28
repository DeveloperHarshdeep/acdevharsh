import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tiers = [
  {
    name: "Basic Check",
    price: "₹399",
    bullets: ["Filter cleaning", "Performance check", "Minor adjustments"],
    badge: "Most popular",
    details: "Basic Check is perfect for small units and includes a filter cleaning, minor adjustments, and performance check.",
  },
  {
    name: "Full Service",
    price: "₹999",
    bullets: ["Deep cleaning", "Coil clean", "Gas check", "Performance optimization"],
    badge: "Best value",
    details: "Full Service includes deep cleaning, coil cleaning, gas check, and performance optimization for maximum efficiency.",
  },
  {
    name: "Annual AMC",
    price: "₹2999/yr",
    bullets: ["4 visits/year", "Priority support", "Discounted parts", "Free emergency visit"],
    badge: "Recommended",
    details: "Annual AMC provides 4 visits per year, priority support, discounted parts, and free emergency visits for hassle-free maintenance.",
  },
];

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">Transparent Pricing</h1>
          <p className="mt-3 text-gray-700 max-w-2xl">Clear packages so you know exactly what you pay for. No surprises.</p>
        </motion.header>

        {/* Pricing Cards */}
        <section className="mt-12 grid gap-8 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{t.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">{t.badge}</div>
                </div>
                <div className="text-2xl font-bold">{t.price}</div>
              </div>
              <ul className="text-gray-600 space-y-2 mb-6">
                {t.bullets.map((b, ix) => <li key={ix}>• {b}</li>)}
              </ul>
              <div className="flex gap-3">
                <a href="/booking" className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow">Book {t.name}</a>
                <button
                  onClick={() => setSelectedTier(t)}
                  className="px-4 py-3 rounded-xl border hover:bg-gray-50 transition"
                >
                  Details
                </button>
              </div>
            </motion.article>
          ))}
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedTier && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative"
              >
                <button
                  onClick={() => setSelectedTier(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{selectedTier.name} Details</h2>
                <p className="text-gray-700 mb-4">{selectedTier.details}</p>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  {selectedTier.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <a
                  href="/booking"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow"
                >
                  Book {selectedTier.name}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
{/* Long explainer */}
        <section className="mt-12 bg-white p-8 rounded-2xl shadow">
          <h3 className="text-2xl font-semibold mb-4">How pricing works</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Prices depend on size of the unit, brand, and type of service. The packages above represent typical costs for standard split AC units.
            For window units, multi-split or VRF systems, prices may vary. We will always send a clear quotation before performing paid repairs.
          </p>

          <h4 className="font-semibold mt-4">Extra charges (examples)</h4>
          <ul className="text-gray-600 list-disc ml-5 mt-2 space-y-1">
            <li>Compressor replacement — price varies by brand & model.</li>
            <li>Gas refilling — depends on refrigerant type and quantity.</li>
            <li>Long-distance travel — for remote locations, a travel fee may apply.</li>
          </ul>

          <div className="mt-8 p-6 bg-sky-50 rounded-lg">
            <div className="font-semibold">Pro tip:</div>
            <div className="text-sm text-gray-700">Book a Full Service once a year to keep the unit efficient and avoid costly repairs later.</div>
          </div>
        </section>

        {/* Comparison table (responsive) */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Compare plans</h3>
          <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-3">Feature</th>
                  <th className="py-3">Basic Check</th>
                  <th className="py-3">Full Service</th>
                  <th className="py-3">AMC</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  ["Filter cleaning", "✔", "✔", "✔"],
                  ["Deep cleaning (coils)", "—", "✔", "✔"],
                  ["Gas top-up", "—", "✔*", "✔*"],
                  ["Priority support", "—", "—", "✔"],
                  ["Free emergency visit", "—", "—", "✔"],
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3">{row[0]}</td>
                    <td className="py-3">{row[1]}</td>
                    <td className="py-3">{row[2]}</td>
                    <td className="py-3">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-2">*Gas availability & pricing subject to model and refrigerant type.</div>
          </div>
        </section>

        {/* CTA */}
        <motion.section className="mt-12 text-center" whileHover={{ scale: 1.01 }}>
          <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg">
            <div className="text-xl font-bold">Need a custom quote?</div>
            <div className="mt-2 text-sm">Contact us with unit details and we’ll send a precise estimate.</div>
            <div className="mt-4">
              <a href="/contact" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">Get Quote</a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}



// 

// 
// 
