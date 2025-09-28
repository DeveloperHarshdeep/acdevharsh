import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiClipboardList,
  HiCog,
  HiOutlineUsers,
  HiLogout,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <HiHome />, link: "/admin/dashboard" },
    { name: "Services", icon: <HiClipboardList />, link: "/admin/services" },
    { name: "Bookings", icon: <HiClipboardList />, link: "/admin/bookings" },
    { name: "Packages", icon: <HiCog />, link: "/admin/packages" },
    { name: "Customers", icon: <HiOutlineUsers />, link: "/admin/customers" },
    { name: "Content", icon: <HiCog />, link: "/admin/content" },
  ];

  const SidebarContent = ({ forceOpen = false }) => {
    const open = forceOpen || isOpen;

    return (
      <motion.div
        animate={{ width: open ? 240 : 72 }}
        transition={{ duration: 0.25 }}
        className="h-screen flex-shrink-0 overflow-y-auto no-scrollbar bg-gradient-to-b from-blue-600 to-indigo-600 text-white flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-center mt-6 px-2">
          <span className="font-bold text-white truncate text-lg">
            {open ? "AC Admin" : "AC"}
          </span>
        </div>

        {/* Menu */}
        <ul className="mt-10 flex-1">
          {menuItems.map((item, idx) => {
            const active = location.pathname === item.link;
            return (
              <li key={idx}>
                <Link to={item.link} onClick={() => setMobileOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-4 p-3 mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200
                      ${active ? "bg-indigo-500 shadow-lg" : "hover:bg-indigo-500"}
                      ${!open ? "justify-center" : ""}`}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    {open && (
                      <span className="font-medium truncate">{item.name}</span>
                    )}
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="p-4">
          <button
            aria-label="Logout"
            className={`w-full flex items-center ${
              open ? "justify-start gap-2" : "justify-center"
            } bg-red-500 hover:bg-red-400 p-2 rounded-lg transition-all`}
          >
            <HiLogout size={20} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen z-40">
        <SidebarContent />
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 md:hidden z-50"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative h-full w-64 bg-gradient-to-b from-blue-600 to-indigo-600">
              <SidebarContent forceOpen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
