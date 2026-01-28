
// 4️⃣ History.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/booking/get-allBookings?searchTerm=${search}`, { credentials: "include" });
      const data = await res.json();
      if (data?.success) setBookings(data.bookings);
      else toast.error(data?.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [search]);

  const deleteHistory = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/booking/delete-booking-history/${id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      toast[data?.success ? "success" : "error"](data?.message);
      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full sm:w-[95%] bg-white shadow-md rounded p-3">
        <h1 className="text-center text-2xl">{loading ? "Loading..." : "History"}</h1>
        <input type="text" placeholder="Search..." className="border p-2 rounded my-2 w-full" onChange={(e) => setSearch(e.target.value)} />
        <div>
          {bookings?.map((b) => (
            <div key={b._id} className="flex justify-between border-b p-2 items-center flex-wrap gap-2">
              <Link to={`/package/${b.packageDetails?._id}`}>{b.packageDetails?.packageName}</Link>
              <p>{b.buyer?.username}</p>
              <p>{b.buyer?.email}</p>
              <p>{b.date}</p>
              <button onClick={() => deleteHistory(b._id)} disabled={loading} className="bg-red-600 text-white p-2 rounded">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;