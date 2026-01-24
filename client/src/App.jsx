import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Search from "./Page/Search";
import BlogPage from "./Page/BlogPage";
import AboutPage from "./Page/AboutPage";
import Profile from "./Page/Profile";
import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import PackagesPage from "./Page/PackagePage";
import VisaApply from "./components/VisaApply";
import FlightApplyPage from "./components/FlightApply";
import VisaPage from "./Page/VisaPage";
import FlightPage from "./Page/FlightPage";
import HolidayPage from "./Page/HolidayPage";
import BookHolidayPage from "./Page/BookHolidayPage";
import CarPackagePage from "./Page/CarPackagePage";
import BookCar from "./components/BookCar";
import NotFound from "./components/NotFound";
import AdminDashboard from "./Page/admin/AdminDashboard";
import RoleSelectionCard from "./components/RoleSelectionCard";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import UpdatePackage from "./Page/admin/UpdatePackage";
import RatingsPage from "./Page/user/RatingPage";
import Package from "./Page/Package";
import Booking from "./Page/user/Booking";
import Contacts from "./components/Contacts";
import { FaRobot } from "react-icons/fa";
import AskAIModal from "./components/AskAIModal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [aiReply, setAIReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (question) => {
    setLoading(true);
    try {
      const res = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        method: "post",
        data: { contents: [{ parts: [{ text: question }] }] },
      });
      const response = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAIReply(response || "No answer from AI.");
    } catch (error) {
      console.log(error);
      setAIReply("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/select-role" element={<RoleSelectionCard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/package" element={<PackagesPage />} />
          <Route path="/package/:id" element={<Package />} />
          <Route path="/package/ratings/:id" element={<RatingsPage />} />
          <Route path="/visa-package" element={<VisaPage />} />
          <Route path="/air-package" element={<FlightPage />} />
          <Route path="/holiday" element={<HolidayPage />} />
          <Route path="/book-holiday" element={<BookHolidayPage />} />
          <Route path="/book-flight" element={<FlightApplyPage />} />
          <Route path="/visa-apply" element={<VisaApply />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/car-package" element={<CarPackagePage />} />
          <Route path="/car-book" element={<BookCar />} />

          {/* ✅ FIXED USER ROUTES (Removed 'path' from PrivateRoute wrapper) */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile/user" element={<Profile />} />
            <Route path="/booking/:packageId" element={<Booking />} />
          </Route>

          {/* ✅ FIXED ADMIN ROUTES (Removed 'path' from AdminRoute wrapper) */}
          <Route element={<AdminRoute />}>
            <Route path="/profile/admin" element={<AdminDashboard />} />
            <Route path="/profile/admin/update-package/:id" element={<UpdatePackage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl animate-bounce"
      >
        <FaRobot size={24} />
      </button>

      <AskAIModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAsk={handleAsk}
        reply={aiReply}
        loading={loading}
      />
    </>
  );
}

export default App;