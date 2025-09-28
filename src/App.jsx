import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

// Website Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminServices from "./pages/Admin/Services";
import AdminBookings from "./pages/Admin/Bookings";
import AdminPackages from "./pages/Admin/Packages";
import AdminCustomer from "./pages/Admin/Customers";
import AdminContent from "./pages/Admin/Content";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/admin/Sidebar";
import Topbar from "./components/admin/Topbar";

// ------------------- Layouts ------------------- //

// Website Layout
const WebsiteLayout = () => (
  <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-50">
    <Navbar />
    <main className="flex-1 w-full overflow-x-hidden">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Admin Layout
const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true); // default open on desktop
  const [mobileOpen, setMobileOpen] = useState(false); // mobile toggle

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col w-full">
        <Topbar
          onMenuClick={() => {
            if (window.innerWidth < 768) {
              setMobileOpen(!mobileOpen);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        />

        <main
          className={`flex-1 pt-16 transition-all duration-300 ${
            isOpen ? "md:ml-[240px]" : "md:ml-[72px]"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};


// ------------------- App ------------------- //
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website Routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/customers" element={<AdminCustomer />} />
          <Route path="/admin/content" element={<AdminContent />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
              <h1 className="text-5xl font-extrabold text-sky-500 mb-4">404</h1>
              <p className="text-lg text-gray-600 mb-6">
                Oops! The page you are looking for does not exist.
              </p>
              <a
                href="/"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Go Back Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
