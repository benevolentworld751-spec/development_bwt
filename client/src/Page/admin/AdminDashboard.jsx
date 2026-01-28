import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../../redux/user/userSlice";

import AllBookings from "./AllBookings";
import AdminUpdateProfile from "./AdminUpdateProfile";
import AddPackages from "./AddPackages";
import AllPackages from "./AllPackages";
import AllUsers from "./AllUsers";
import Payment from "./Payment";
import RatingsReviews from "./RatingsReviews";
import History from "./History";

import "./styles/DashBoardStyle.css";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const panels = [
  { id: 1, label: "Bookings", component: <AllBookings /> },
  { id: 2, label: "Add Packages", component: <AddPackages /> },
  { id: 3, label: "All Packages", component: <AllPackages /> },
  { id: 4, label: "Users", component: <AllUsers /> },
  { id: 5, label: "Payments", component: <Payment /> },
  { id: 6, label: "Ratings/Reviews", component: <RatingsReviews /> },
  { id: 7, label: "History", component: <History /> },
  { id: 8, label: "Update Profile", component: <AdminUpdateProfile /> },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  const [activePanelId, setActivePanelId] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: null,
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!data?.success) {
        dispatch(logOutFailure(data?.message));
        toast.error(data?.message || "Logout failed");
        return;
      }

      dispatch(logOutSuccess());
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      dispatch(logOutFailure(err.message));
      toast.error("Logout failed");
    }
  };

  const handleDeleteAccount = async () => {
    const CONFIRM = window.confirm(
      "Are you sure? Your account will be permanently deleted!"
    );
    if (!CONFIRM) return;

    try {
      dispatch(deleteUserAccountStart());
      const res = await fetch(`${API_URL}/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!data?.success) {
        dispatch(deleteUserAccountFailure(data?.message));
        toast.error(data?.message || "Failed to delete account");
        return;
      }

      dispatch(deleteUserAccountSuccess());
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      dispatch(deleteUserAccountFailure(err.message));
      toast.error("Failed to delete account");
    }
  };

  if (loading || !currentUser) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="flex w-full flex-wrap max-sm:flex-col gap-16 p-2">
      {/* Sidebar */}
      <div className="w-[25%] p-3 max-sm:w-full">
        <div className="flex flex-col items-center gap-4 p-3 rounded-lg shadow-lg">
          <img
            src={
              formData.avatar?.startsWith("http")
                ? formData.avatar
                : `${API_URL}/images/${formData.avatar}`
            }
            alt="Profile"
            className="w-36 h-36 object-cover rounded-full"
          />
          <p className="font-semibold border-b border-black py-1 w-full text-center">
            Logged in user Information
          </p>
          <button
            onClick={() => setActivePanelId(8)}
            className="px-8 bg-[#EB662B] text-white text-base font-semibold my-3 py-1 rounded-lg hover:opacity-90"
          >
            Edit Profile
          </button>

          <div className="w-full flex flex-col gap-3 shadow-2xl rounded-lg p-3 break-all">
            {["Name", "Email", "Phone", "Address"].map((field) => (
              <div key={field}>
                <p>{field}</p>
                <p className="text-base font-semibold py-2 border border-gray-300 px-3">
                  {formData[field.toLowerCase()]}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-[#6358DC] text-white rounded-lg hover:opacity-90"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-1 bg-[#EB662B] text-white rounded-lg hover:opacity-90"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="w-[65%] max-sm:w-full">
        <nav className="w-full border-b-4 border-[#EB662B] py-3 overflow-x-auto">
          <div className="flex gap-2">
            {panels.map((panel) => (
              <button
                key={panel.id}
                className={`p-1 rounded-t transition-all duration-300 text-nowrap ${
                  activePanelId === panel.id ? "bg-[#EB662B] text-white" : ""
                }`}
                onClick={() => setActivePanelId(panel.id)}
              >
                {panel.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="content-div flex flex-wrap my-5">
          {panels.find((panel) => panel.id === activePanelId)?.component || (
            <div>Page Not Found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
