// src/pages/admin/Bookings.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiSearch,
  HiPlus,
} from "react-icons/hi";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      customer: { name: "Rahul Verma", phone: "9876543210" },
      service: "AC Installation",
      date: "2025-10-28",
      time: "10:00",
      status: "pending",
      advancePaid: false,
      amountPaid: 0,
    },
    {
      _id: "2",
      customer: { name: "Priya Sharma", phone: "9123456780" },
      service: "AC Repair",
      date: "2025-10-29",
      time: "14:00",
      status: "confirmed",
      advancePaid: true,
      amountPaid: 500,
    },
    {
      _id: "3",
      customer: { name: "Ankit Singh", phone: "9988776655" },
      service: "AC Maintenance",
      date: "2025-10-30",
      time: "11:30",
      status: "completed",
      advancePaid: true,
      amountPaid: 300,
    },
  ]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    customerName: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    advancePaid: false,
    amountPaid: 0,
  });

  const filtered = bookings.filter(
    (b) =>
      b.customer?.name.toLowerCase().includes(search.toLowerCase()) ||
      b.customer?.phone.includes(search) ||
      b.service.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status } : b))
    );
  };

  const addBooking = () => {
    if (!newBooking.customerName || !newBooking.service || !newBooking.date) return;
    setBookings((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        customer: { name: newBooking.customerName, phone: newBooking.phone },
        service: newBooking.service,
        date: newBooking.date,
        time: newBooking.time,
        status: "pending",
        advancePaid: newBooking.advancePaid,
        amountPaid: newBooking.amountPaid,
      },
    ]);
    setShowModal(false);
    setNewBooking({
      customerName: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      advancePaid: false,
      amountPaid: 0,
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "flex items-center justify-center px-3 py-1 rounded-full font-semibold text-sm shadow-sm w-max";
    switch (status) {
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <HiClock className="mr-1" /> Pending
          </span>
        );
      case "confirmed":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <HiCheckCircle className="mr-1" /> Confirmed
          </span>
        );
      case "in-progress":
        return (
          <span className={`${baseClasses} bg-indigo-100 text-indigo-800`}>
            <HiClock className="mr-1" /> In Progress
          </span>
        );
      case "completed":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <HiCheckCircle className="mr-1" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <HiXCircle className="mr-1" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Bookings Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
        >
          <HiPlus /> Add Booking
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6 max-w-md bg-white rounded-lg shadow-md px-4 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500">
        <HiSearch className="text-gray-400 mr-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, phone, or service..."
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
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Advance</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filtered.map((b, i) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b hover:bg-gray-100 cursor-pointer transition-all duration-300 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-700">{b.customer?.name}</td>
                    <td className="p-4 text-gray-600">{b.service}</td>
                    <td className="p-4 text-gray-600">{b.date}</td>
                    <td className="p-4 text-gray-600">{b.time}</td>
                    <td className="p-4 text-gray-600">{b.customer?.phone}</td>
                    <td className="p-4 text-gray-600">
                      {b.advancePaid ? `Paid (${b.amountPaid})` : "Not Paid"}
                    </td>
                    <td className="p-4">{getStatusBadge(b.status)}</td>
                    <td className="p-4 flex flex-wrap gap-2">
                      {b.status !== "completed" && b.status !== "cancelled" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(b._id, "confirmed")}
                            className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
                          >
                            Confirm
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(b._id, "in-progress")}
                            className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors"
                          >
                            In Progress
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(b._id, "cancelled")}
                            className="px-4 py-1 text-sm bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-colors"
                          >
                            Cancel
                          </motion.button>
                        </>
                      )}
                      {b.status === "in-progress" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(b._id, "completed")}
                          className="px-4 py-1 text-sm bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors"
                        >
                          Complete
                        </motion.button>
                      )}
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
              No bookings found
            </motion.div>
          ) : (
            filtered.map((b) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-white rounded-lg shadow flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{b.customer?.name}</span>
                  {getStatusBadge(b.status)}
                </div>
                <div className="text-gray-600">
                  <p>Service: {b.service}</p>
                  <p>Date: {b.date}</p>
                  <p>Time: {b.time}</p>
                  <p>Phone: {b.customer?.phone}</p>
                  <p>Advance: {b.advancePaid ? `Paid (${b.amountPaid})` : "Not Paid"}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {b.status !== "completed" && b.status !== "cancelled" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateStatus(b._id, "confirmed")}
                        className="flex-1 px-4 py-1 text-sm bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
                      >
                        Confirm
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateStatus(b._id, "in-progress")}
                        className="flex-1 px-4 py-1 text-sm bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors"
                      >
                        In Progress
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateStatus(b._id, "cancelled")}
                        className="flex-1 px-4 py-1 text-sm bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </>
                  )}
                  {b.status === "in-progress" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(b._id, "completed")}
                      className="flex-1 px-4 py-1 text-sm bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors"
                    >
                      Complete
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Booking Modal */}
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
            <h2 className="text-xl font-bold mb-4">Add New Booking</h2>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Customer Name"
                value={newBooking.customerName}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, customerName: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newBooking.phone}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, phone: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Service"
                value={newBooking.service}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, service: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="date"
                value={newBooking.date}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, date: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="time"
                value={newBooking.time}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, time: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newBooking.advancePaid}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, advancePaid: e.target.checked })
                  }
                />
                <span>Advance Paid</span>
                {newBooking.advancePaid && (
                  <input
                    type="number"
                    placeholder="Amount Paid"
                    value={newBooking.amountPaid}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, amountPaid: e.target.value })
                    }
                    className="px-2 py-1 border rounded w-24"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addBooking}
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
