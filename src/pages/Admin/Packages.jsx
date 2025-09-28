// src/pages/admin/Packages.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiSearch, HiPencil, HiTrash } from "react-icons/hi";

export default function Packages() {
  const [packages, setPackages] = useState([
    {
      _id: "1",
      name: "Basic Check",
      price: "₹399",
      features: ["Filter cleaning", "Performance check", "Minor adjustments"],
      badge: "Most Popular",
      details:
        "Perfect for small units and includes a filter cleaning, minor adjustments, and performance check.",
    },
    {
      _id: "2",
      name: "Full Service",
      price: "₹999",
      features: ["Deep cleaning", "Coil clean", "Gas check", "Performance optimization"],
      badge: "Best Value",
      details:
        "Includes deep cleaning, coil cleaning, gas check, and performance optimization for maximum efficiency.",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    features: "",
    badge: "",
    details: "",
  });

  const filtered = packages.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.price.includes(search) ||
      p.badge.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () =>
    setForm({ name: "", price: "", features: "", badge: "", details: "" });

  const addOrUpdatePackage = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setPackages((prev) =>
        prev.map((p) =>
          p._id === editing ? { ...form, _id: editing, features: form.features.split(",") } : p
        )
      );
    } else {
      setPackages((prev) => [
        ...prev,
        {
          ...form,
          _id: Date.now().toString(),
          features: form.features.split(","),
        },
      ]);
    }
    resetForm();
    setEditing(null);
    setShowModal(false);
  };

  const deletePackage = (id) => {
    setPackages((prev) => prev.filter((p) => p._id !== id));
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      name: p.name,
      price: p.price,
      features: p.features.join(","),
      badge: p.badge,
      details: p.details,
    });
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Packages Dashboard</h1>
        <button
          onClick={() => {
            resetForm();
            setEditing(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
        >
          <HiPlus /> Add Package
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6 max-w-md bg-white rounded-lg shadow-md px-4 py-2">
        <HiSearch className="text-gray-400 mr-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, price, or badge..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Badge</th>
              <th className="p-4 text-left">Features</th>
              <th className="p-4 text-left">Details</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No packages found
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b hover:bg-gray-100 transition ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4">{p.price}</td>
                    <td className="p-4">{p.badge}</td>
                    <td className="p-4">{p.features.join(", ")}</td>
                    <td className="p-4 max-w-xs truncate">{p.details}</td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <HiPencil />
                      </button>
                      <button
                        onClick={() => deletePackage(p._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <HiTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center text-gray-500 bg-white rounded-lg shadow"
            >
              No packages found
            </motion.div>
          ) : (
            filtered.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-white rounded-lg shadow"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-gray-800">{p.name}</h2>
                  <span className="text-sm font-semibold text-indigo-600">
                    {p.price}
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  <p>Badge: {p.badge}</p>
                  <p>Features: {p.features.join(", ")}</p>
                  <p className="truncate">Details: {p.details}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePackage(p._id)}
                    className="flex-1 px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Package" : "Add Package"}
            </h2>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Package Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Features (comma separated)"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Badge"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Details"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrUpdatePackage}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
