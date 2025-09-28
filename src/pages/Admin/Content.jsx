// src/pages/admin/Content.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiXCircle } from "react-icons/hi";

export default function Content() {
  // Hero Section
  const [hero, setHero] = useState({
    title: "Reliable AC Service at Your Doorstep",
    subtitle: "Book expert AC repair & maintenance with just one click.",
    ctaLabel: "Book AC Service",
  });

  // Services Section
  const [services, setServices] = useState([
    { name: "AC Installation", description: "Professional AC unit installation." },
    { name: "AC Repair", description: "Quick and reliable repair services." },
    { name: "AC Maintenance", description: "Regular check-ups to ensure efficiency." },
  ]);

  // Testimonials Section
  const [testimonials, setTestimonials] = useState([
    { name: "Rahul Verma", feedback: "Excellent AC service, very professional!" },
    { name: "Priya Sharma", feedback: "Quick response and affordable rates." },
  ]);

  // Booking CTA Section
  const [cta, setCta] = useState({
    title: "Ready to Get Started?",
    subtitle: "Book your AC service in seconds and enjoy a cool, comfortable home.",
    button: "Book Now",
  });

  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "" });

  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: "", feedback: "" });

  // Add service/testimonial functions
  const addService = () => {
    if (!newService.name) return;
    setServices([...services, newService]);
    setNewService({ name: "", description: "" });
    setShowServiceModal(false);
  };

  const addTestimonial = () => {
    if (!newTestimonial.name) return;
    setTestimonials([...testimonials, newTestimonial]);
    setNewTestimonial({ name: "", feedback: "" });
    setShowTestimonialModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Hero Section</h1>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
          placeholder="Hero Title"
          className="w-full px-3 py-2 border rounded outline-none"
        />
        <textarea
          value={hero.subtitle}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          placeholder="Hero Subtitle"
          className="w-full px-3 py-2 border rounded outline-none"
        />
        <input
          type="text"
          value={hero.ctaLabel}
          onChange={(e) => setHero({ ...hero, ctaLabel: e.target.value })}
          placeholder="CTA Button Label"
          className="w-full px-3 py-2 border rounded outline-none"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all">
          Save Hero
        </button>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Services</h1>
          <button
            onClick={() => setShowServiceModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
          >
            <HiPlus /> Add Service
          </button>
        </div>
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded border flex flex-col space-y-2">
              <input
                type="text"
                value={s.name}
                onChange={(e) => {
                  const updated = [...services];
                  updated[i].name = e.target.value;
                  setServices(updated);
                }}
                className="w-full px-3 py-2 border rounded outline-none font-semibold"
              />
              <textarea
                value={s.description}
                onChange={(e) => {
                  const updated = [...services];
                  updated[i].description = e.target.value;
                  setServices(updated);
                }}
                className="w-full px-3 py-2 border rounded outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Testimonials</h1>
          <button
            onClick={() => setShowTestimonialModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
          >
            <HiPlus /> Add Testimonial
          </button>
        </div>
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded border flex flex-col space-y-2">
              <input
                type="text"
                value={t.name}
                onChange={(e) => {
                  const updated = [...testimonials];
                  updated[i].name = e.target.value;
                  setTestimonials(updated);
                }}
                className="w-full px-3 py-2 border rounded outline-none font-semibold"
              />
              <textarea
                value={t.feedback}
                onChange={(e) => {
                  const updated = [...testimonials];
                  updated[i].feedback = e.target.value;
                  setTestimonials(updated);
                }}
                className="w-full px-3 py-2 border rounded outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Booking CTA Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Booking CTA</h1>
        <input
          type="text"
          value={cta.title}
          onChange={(e) => setCta({ ...cta, title: e.target.value })}
          placeholder="CTA Title"
          className="w-full px-3 py-2 border rounded outline-none"
        />
        <textarea
          value={cta.subtitle}
          onChange={(e) => setCta({ ...cta, subtitle: e.target.value })}
          placeholder="CTA Subtitle"
          className="w-full px-3 py-2 border rounded outline-none"
        />
        <input
          type="text"
          value={cta.button}
          onChange={(e) => setCta({ ...cta, button: e.target.value })}
          placeholder="CTA Button Label"
          className="w-full px-3 py-2 border rounded outline-none"
        />
      </div>

      {/* Add Service Modal */}
      <AnimatePresence>
        {showServiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Add Service</h2>
              <input
                type="text"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <textarea
                placeholder="Service Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addService}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Testimonial Modal */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>
              <input
                type="text"
                placeholder="Customer Name"
                value={newTestimonial.name}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <textarea
                placeholder="Feedback"
                value={newTestimonial.feedback}
                onChange={(e) =>
                  setNewTestimonial({ ...newTestimonial, feedback: e.target.value })
                }
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowTestimonialModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addTestimonial}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
