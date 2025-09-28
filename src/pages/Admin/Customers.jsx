// src/pages/admin/Customers.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch,
  HiPlus,
  HiCheckCircle,
  HiXCircle,
  HiEye,
} from "react-icons/hi";

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      _id: "1",
      name: "Rahul Verma",
      phone: "9876543210",
      email: "rahul@example.com",
      address: "Delhi, India",
      totalBookings: 5,
      status: "active",
      createdAt: "2024-09-01",
    },
    {
      _id: "2",
      name: "Priya Sharma",
      phone: "9123456780",
      email: "priya@example.com",
      address: "Mumbai, India",
      totalBookings: 3,
      status: "lead",
      createdAt: "2024-10-12",
    },
    {
      _id: "3",
      name: "Ankit Singh",
      phone: "9988776655",
      email: "ankit@example.com",
      address: "Chandigarh, India",
      totalBookings: 7,
      status: "blocked",
      createdAt: "2024-11-25",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    totalBookings: 0,
    status: "active",
  });

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.address) return;
    setCustomers((prev) => [
      ...prev,
      { _id: Date.now().toString(), ...newCustomer, createdAt: new Date().toISOString().split("T")[0] },
    ]);
    setShowModal(false);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
      totalBookings: 0,
      status: "active",
    });
  };

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c._id === id
          ? {
              ...c,
              status:
                c.status === "active"
                  ? "blocked"
                  : c.status === "blocked"
                  ? "lead"
                  : "active",
            }
          : c
      )
    );
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "flex items-center justify-center px-3 py-1 rounded-full font-semibold text-sm shadow-sm w-max";
    if (status === "active") {
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          <HiCheckCircle className="mr-1" /> Active
        </span>
      );
    }
    if (status === "lead") {
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          <HiEye className="mr-1" /> Lead
        </span>
      );
    }
    return (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>
        <HiXCircle className="mr-1" /> Blocked
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Customers Dashboard
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
        >
          <HiPlus /> Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6 max-w-md bg-white rounded-lg shadow-md px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <HiSearch className="text-gray-400 mr-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white sticky top-0">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Bookings</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <motion.tr
                    key={c._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b hover:bg-gray-100 cursor-pointer transition-all duration-300 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-700">{c.name}</td>
                    <td className="p-4 text-gray-600">{c.phone}</td>
                    <td className="p-4 text-gray-600">{c.email}</td>
                    <td className="p-4 text-gray-600">{c.address}</td>
                    <td className="p-4 text-gray-600">{c.totalBookings}</td>
                    <td className="p-4">{getStatusBadge(c.status)}</td>
                    <td className="p-4 text-gray-500">{c.createdAt}</td>
                    <td className="p-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleStatus(c._id)}
                        className={`px-3 py-1 text-sm rounded-md shadow text-white transition-colors ${
                          c.status === "active"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        Toggle Status
                      </motion.button>
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
              No customers found
            </motion.div>
          ) : (
            filtered.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-white rounded-lg shadow flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{c.name}</span>
                  {getStatusBadge(c.status)}
                </div>
                <div className="text-gray-600 text-sm">
                  <p>📱 {c.phone}</p>
                  <p>✉️ {c.email}</p>
                  <p>📍 {c.address}</p>
                  <p>🗓 Joined: {c.createdAt}</p>
                  <p>📑 Bookings: {c.totalBookings}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleStatus(c._id)}
                  className={`px-4 py-1 text-sm rounded-md shadow text-white transition-colors ${
                    c.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Toggle Status
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
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
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Address"
                value={newCustomer.address}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, address: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addCustomer}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
