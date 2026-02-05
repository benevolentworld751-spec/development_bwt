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
import VisaPage from "./Page/VisaPage";
import FlightPage from "./Page/FlightPage";
import HolidayPage from "./Page/HolidayPage";
import CarPackagePage from "./Page/CarPackagePage";
import InternationalPack from "./components/InternationalPack";
import PackageDetailPage from "./components/PackageDetailPage";
import CountryPackagesPage from "./Page/CountryPackagesPage";
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
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { generateResponse } from "./utils/chatbotLogic"; 


function App() {
  const [showModal, setShowModal] = useState(false);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAsk = (question) => {
  setLoading(true);

  setMessages(prev => [...prev, { role: "user", text: question }]);

  setTimeout(() => {
    const response = generateResponse(question);

    if (typeof response === "string") {
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: response.text,
          action: response,
        },
        {
          role: "bot",
          text: "💬 Would you like to chat with us on WhatsApp?",
        }
      ]);
    }

    setLoading(false);
  }, 800);
};


  return (
    <>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
          <Route path="/visa-apply" element={<VisaApply />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/car-package" element={<CarPackagePage />} />
          <Route path="/international-pack" element={<InternationalPack />} />
          <Route path="/packages/:country" element={<CountryPackagesPage />} />

          <Route
            path="/packages/detail/:slug"
            element={<PackageDetailPage />}
          />

          {/* User Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile/user" element={<Profile />} />
            <Route path="/booking/:packageId" element={<Booking />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/profile/admin" element={<AdminDashboard />} />
            <Route
              path="/profile/admin/update-package/:id"
              element={<UpdatePackage />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl animate-bounce transition-all hover:scale-110"
      >
        <FaRobot size={28} />
      </button>

      <AskAIModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAsk={handleAsk}
        messages={messages}
        loading={loading}
      />
    </>
  );
}

export default App;
