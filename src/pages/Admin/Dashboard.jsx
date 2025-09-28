import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  // Stats
  const stats = [
    { title: "Total Services", value: 12, color: "from-cyan-400 to-blue-500" },
    { title: "Bookings Today", value: 8, color: "from-green-400 to-green-500" },
    { title: "Revenue", value: "$1,200", color: "from-yellow-400 to-orange-500" },
    { title: "Pending Requests", value: 3, color: "from-red-400 to-red-500" },
  ];

  // Charts
  const revenueData = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 800 },
    { month: "Mar", revenue: 600 },
    { month: "Apr", revenue: 1200 },
    { month: "May", revenue: 900 },
    { month: "Jun", revenue: 1500 },
  ];

  const bookingData = [
    { day: "Mon", bookings: 5 },
    { day: "Tue", bookings: 7 },
    { day: "Wed", bookings: 3 },
    { day: "Thu", bookings: 8 },
    { day: "Fri", bookings: 6 },
    { day: "Sat", bookings: 4 },
    { day: "Sun", bookings: 2 },
  ];

  // Bookings Table
  const allBookings = [
    { id: 1, customer: "John Doe", service: "AC Repair", date: "2025-09-22", status: "Pending" },
    { id: 2, customer: "Jane Smith", service: "AC Installation", date: "2025-09-21", status: "Completed" },
    { id: 3, customer: "Mike Johnson", service: "AC Gas Refill", date: "2025-09-21", status: "Pending" },
    { id: 4, customer: "Emily Davis", service: "AC Maintenance", date: "2025-09-20", status: "Completed" },
    { id: 5, customer: "Chris Evans", service: "AC Cleaning", date: "2025-09-19", status: "Completed" },
    { id: 6, customer: "Robert Brown", service: "AC Installation", date: "2025-09-18", status: "Pending" },
    { id: 7, customer: "Sophia Lee", service: "AC Repair", date: "2025-09-17", status: "Completed" },
  ];
  const [visibleBookings, setVisibleBookings] = useState(4);
  const [searchBooking, setSearchBooking] = useState("");

  // Services List
  const allServices = [
    { name: "AC Repair", bookings: 32 },
    { name: "AC Installation", bookings: 18 },
    { name: "AC Gas Refill", bookings: 25 },
    { name: "AC Maintenance", bookings: 20 },
    { name: "AC Cleaning", bookings: 15 },
    { name: "AC Filter Change", bookings: 10 },
    { name: "AC Inspection", bookings: 8 },
    { name: "AC Noise Fix", bookings: 6 },
  ];
  const [visibleServices, setVisibleServices] = useState(4);
  const [searchService, setSearchService] = useState("");

  // Filtered Data
  const filteredBookings = allBookings.filter(
    (b) =>
      b.customer.toLowerCase().includes(searchBooking.toLowerCase()) ||
      b.service.toLowerCase().includes(searchBooking.toLowerCase())
  );

  const filteredServices = allServices.filter((s) =>
    s.name.toLowerCase().includes(searchService.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 flex flex-col gap-6 bg-gray-50 text-gray-900 transition-colors">
      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {stats.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${card.color} text-white p-4 md:p-6 rounded-2xl shadow-xl flex flex-col justify-between min-h-[100px]`}
          >
            <span className="text-sm opacity-80">{card.title}</span>
            <span className="text-xl md:text-2xl font-bold mt-2">{card.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-base md:text-lg font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Overview */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-base md:text-lg font-semibold mb-4">Bookings This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h2 className="text-base md:text-lg font-semibold">Recent Bookings</h2>
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchBooking}
            onChange={(e) => setSearchBooking(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
          />
        </div>
        <table className="w-full text-sm md:text-base text-left table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Service</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.slice(0, visibleBookings).map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">{booking.id}</td>
                <td className="px-3 py-2">{booking.customer}</td>
                <td className="px-3 py-2">{booking.service}</td>
                <td className="px-3 py-2">{booking.date}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === "Pending"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleBookings < filteredBookings.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setVisibleBookings((prev) => prev + 3)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {/* All Services Section */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h2 className="text-base md:text-lg font-semibold">All Services</h2>
          <input
            type="text"
            placeholder="Search services..."
            value={searchService}
            onChange={(e) => setSearchService(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white border-gray-300"
          />
        </div>
        <ul className="space-y-3">
          {filteredServices.slice(0, visibleServices).map((srv, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <span>{srv.name}</span>
              <span className="font-bold text-blue-600">
                {srv.bookings} Bookings
              </span>
            </li>
          ))}
        </ul>
        {visibleServices < filteredServices.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setVisibleServices((prev) => prev + 3)}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
