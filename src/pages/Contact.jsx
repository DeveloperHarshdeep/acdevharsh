// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // placeholder: call backend /api/contact
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.header initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">Contact Us</h1>
          <p className="mt-3 text-gray-700 max-w-2xl">Questions, service requests or partnerships — reach out and our team will respond quickly.</p>
        </motion.header>

        <section className="mt-12 grid gap-8 md:grid-cols-2 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Reach us</h3>
              <p className="text-gray-600 mb-6">Phone support, email, and on-site visits — choose what suits you.</p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white flex items-center justify-center">📞</div>
                  <div>
                    <div className="font-semibold">Call us</div>
                    <div className="text-sm text-gray-600">+91 98765 43210 (Mon-Sat 9am-7pm)</div>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 text-white flex items-center justify-center">✉️</div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-gray-600">support@example.com</div>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-500 text-white flex items-center justify-center">📍</div>
                  <div>
                    <div className="font-semibold">Office</div>
                    <div className="text-sm text-gray-600">Sector 45, City — Open Mon-Fri</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">Business hours</h4>
                <p className="text-sm text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM · Sunday: Emergency service only</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
              <h3 className="text-2xl font-semibold">Send us a message</h3>
              <p className="text-gray-600 text-sm">Share details and we’ll get back with a suggested time slot.</p>

              <div>
                <label className="text-sm font-medium">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-sky-300" placeholder="Your name" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-sky-300" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-sky-300" placeholder="10-digit mobile" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="4" className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-sky-300" placeholder="Tell us about the issue or request" />
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow">Send message</button>
                <div className="text-sm text-gray-500">We usually respond within a few hours.</div>
              </div>

              <motion.div animate={{ scale: sent ? 1 : 0.98, opacity: sent ? 1 : 0 }} transition={{ duration: 0.3 }}>
                {sent && <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg">Thanks! Your message was received. We'll contact you soon.</div>}
              </motion.div>
            </form>
          </motion.div>
        </section>

        {/* Map + FAQ teaser + CTA */}
        <section className="mt-12 grid gap-8 md:grid-cols-3">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h4 className="font-semibold mb-3">Find us on map</h4>
            <div className="w-full h-56 rounded-xl overflow-hidden border">
              {/* A placeholder iframe - replace with Google Maps embed */}
              <iframe
                title="office-map"
                className="w-full h-full"
                src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div className="md:col-span-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h4 className="font-semibold mb-3">Need faster support?</h4>
            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-700">For urgent repairs, call us directly or use the booking page for priority scheduling with advance payment.</p>
              <div className="mt-4 flex gap-3">
                <a href="/booking" className="px-4 py-2 rounded-xl bg-blue-600 text-white">Book Now</a>
                <a href="/services" className="px-4 py-2 rounded-xl border">Explore Services</a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
