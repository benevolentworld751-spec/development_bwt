import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const AllBookings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/api/booking/get-currentBookings?searchTerm=${searchTerm}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data?.success) {
        setCurrentBookings(data.bookings);
        setError(false);
      } else {
        setError(data?.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  const handleCancel = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/api/booking/cancel-booking/${id}/${currentUser._id}`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      toast[data?.success ? "success" : "error"](data?.message);
      getAllBookings();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [searchTerm]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] shadow-xl rounded-lg p-3 flex flex-col gap-2">
        <h1 className="text-center text-2xl">All Bookings</h1>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Search Username or Email"
          className="border p-2 rounded mb-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {currentBookings.map((booking, i) => (
          <div
            key={i}
            className="flex flex-wrap justify-between items-center p-3 border-y gap-2"
          >
            <Link to={`/package/${booking?.packageDetails?._id}`}>
              <img
                className="w-12 h-12"
                src={`${API_URL}/images/${booking?.packageDetails?.packageImages[0]}`}
                alt="Package"
              />
            </Link>
            <Link to={`/package/${booking?.packageDetails?._id}`}>
              <p className="hover:underline">{booking?.packageDetails?.packageName}</p>
            </Link>
            <p>{booking?.buyer?.username}</p>
            <p>{booking?.buyer?.email}</p>
            <p>{booking?.date}</p>
            <button
              onClick={() => handleCancel(booking._id)}
              className="bg-red-600 text-white p-2 rounded hover:opacity-90"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
