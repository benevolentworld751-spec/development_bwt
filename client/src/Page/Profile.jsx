import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../redux/user/userSlice";

import MyBookings from "../Page/user/MyBooking";
import UpdateProfile from "../Page/user/UpdateProfile";
import MyHistory from "../Page/user/MyHistory";
import { toast } from "react-toastify";

// Define API URL
const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SERVER_URL
    : "https://benevolent-world-travel.onrender.com";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [activePanelId, setActivePanelId] = useState(1);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // ✅ Helper for Profile Image (Matches Navbar Logic)
  const getProfileImage = () => {
    if (!currentUser?.avatar) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTueIx2Jkawe7r91I50VfVAZLS60yx8RjiSfQ&s";
    }
    // If it starts with http (Google/Firebase), use it as is
    if (currentUser.avatar.startsWith("http")) {
      return currentUser.avatar;
    }
    // Otherwise, append backend URL
    return `${API_URL}/images/${currentUser.avatar}`;
  };

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch(`${API_URL}/api/auth/logout`);
      const data = await res.json();
      if (data?.success !== true) {
        dispatch(logOutFailure(data?.message));
        return;
      }
      dispatch(logOutSuccess());
      navigate("/login");
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm("Are you sure? The account will be permanently deleted!");
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`${API_URL}/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          toast.error("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        toast.success(data?.message);
        navigate("/login");
      } catch {
        toast.error("Error deleting account");
      }
    }
  };

  return (
    <div className="flex w-full flex-wrap max-sm:flex-col p-2">
      {currentUser ? (
        <>
          {/* Left Profile Section */}
          <div className="w-[25%] p-3 max-sm:w-full">
            <div className="flex flex-col items-center gap-4 p-3 rounded-lg shadow-lg">
              {/* Profile Picture Section */}
              <div className="w-full flex flex-col items-center relative">
                <img
                  src={getProfileImage()} // ✅ Uses the helper function
                  alt="Profile photo"
                  className="w-36 h-36 rounded-full object-cover border-2 border-gray-200"
                />
              </div>

              <p>
                <span className="font-semibold" style={{ background: "#fff" }}>
                  Logged in user Information
                </span>
              </p>
              
              <div className="w-full flex justify-between px-1">
                <button
                  onClick={() => setActivePanelId(3)}
                  className="px-8 bg-[#6358DC] text-white text-lg font-semibold flex items-center justify-center my-3 border p-1 rounded-lg hover:text-white"
                >
                  Edit Profile
                </button>
              </div>

              <div className="w-full flex flex-col gap-3 shadow-2xl rounded-lg p-3 break-all">
                <p>Name</p>
                <p className="text-base font-semibold py-2 border border-gray-300 px-3">
                  {currentUser.username}
                </p>
                <p>Email</p>
                <p className="text-base font-semibold py-2 border border-gray-300 px-3">
                  {currentUser.email}
                </p>
                <p>Phone</p>
                <p className="text-base font-semibold py-2 border border-gray-300 px-3">
                  {currentUser.phone || "N/A"}
                </p>
                <p>Address</p>
                <p className="text-base font-semibold py-2 border border-gray-300 px-3">
                  {currentUser.address || "N/A"}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleLogout}
                    className="px-4 bg-[#6358DC] text-white text-sm font-semibold flex items-center justify-center my-3 border p-1 rounded-lg hover:text-white"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 bg-orange-600 text-white text-sm font-semibold flex items-center justify-center my-3 border p-1 rounded-lg hover:text-white"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-[75%] max-sm:w-full">
            <div>
              <nav className="w-full border-blue-500 border-b-4 py-2">
                <div className="w-full flex gap-2">
                  <button
                    className={`p-1 rounded-t transition-all duration-300 ${activePanelId === 1 ? "bg-[#6358DC] text-white" : ""}`}
                    onClick={() => setActivePanelId(1)}
                  >
                    Bookings
                  </button>
                  <button
                    className={`p-1 rounded-t transition-all duration-300 ${activePanelId === 2 ? "bg-[#6358DC] text-white" : ""}`}
                    onClick={() => setActivePanelId(2)}
                  >
                    History
                  </button>
                </div>
              </nav>
              <div className="main flex flex-wrap mt-4">
                {activePanelId === 1 && <MyBookings />}
                {activePanelId === 2 && <MyHistory />}
                {activePanelId === 3 && <UpdateProfile />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full text-center mt-10">
          <p className="text-red-700 font-bold">Please Login First</p>
        </div>
      )}
    </div>
  );
};

export default Profile;