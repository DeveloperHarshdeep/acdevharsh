import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "AC Installation",
      description: "Professional AC installation ensuring efficiency.",
      img: "https://picsum.photos/400/200?random=1",
    },
    {
      id: 2,
      title: "AC Repair",
      description: "Fast repair service with genuine parts.",
      img: "https://picsum.photos/400/200?random=2",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleSave = (service) => {
    if (service.id) {
      // update existing
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? service : s))
      );
    } else {
      // add new
      setServices((prev) => [...prev, { ...service, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditingService(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition"
        >
          <HiPlus /> Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-3">{service.title}</h2>
            <p className="text-gray-600 flex-1">{service.description}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingService(service);
                  setModalOpen(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400"
              >
                <HiPencil />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-400"
              >
                <HiTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">
                {editingService ? "Edit Service" : "Add Service"}
              </h2>
              <ServiceForm
                service={editingService}
                onSave={handleSave}
                onCancel={() => {
                  setModalOpen(false);
                  setEditingService(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceForm = ({ service, onSave, onCancel }) => {
  const [form, setForm] = useState(
    service || { title: "", description: "", img: "" }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-4"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Service Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Service Description"
        className="w-full p-2 border rounded"
        rows="3"
        required
      />
      <input
        name="img"
        value={form.img}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Services;
