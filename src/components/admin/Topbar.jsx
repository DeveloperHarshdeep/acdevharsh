import { useState } from "react";
import { HiUserCircle, HiBell, HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Topbar = ({ onMenuClick, notifications = [] }) => {
  const [showNotif, setShowNotif] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 md:px-6 bg-white shadow-md z-50"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={onMenuClick}
          aria-label="Toggle Sidebar"
        >
          <HiMenu size={24} className="text-gray-700" />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-gray-700 truncate">
          Admin Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <HiBell size={22} className="text-gray-500 hover:text-gray-700 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto z-50"
              >
                <div className="flex justify-between items-center p-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Notifications</span>
                  <button onClick={() => setShowNotif(false)}>
                    <HiX className="text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-gray-500 text-center">No new notifications</div>
                ) : (
                  notifications.map((n, i) => (
                    <Link
                      key={i}
                      to={n.link}
                      className={`block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!n.read ? "bg-gray-50 font-medium" : ""
                        }`}
                      onClick={() => {
                        n.read = true;
                        setShowNotif(false);
                      }}
                    >
                      <p className="text-gray-700">{n.message}</p>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </Link>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <HiUserCircle size={28} className="text-gray-600" />
          <span className="font-medium text-gray-700 hidden sm:block">Admin</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;
