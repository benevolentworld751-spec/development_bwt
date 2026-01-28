// 5️⃣ Payments.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Payments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/booking/get-allBookings?searchTerm=${search}`, { credentials: "include" });
      const data = await res.json();
      if (data?.success) setBookings(data.bookings);
      else toast.error(data?.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [search]);

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full sm:w-[95%] bg-white shadow-md rounded p-3">
        <h1 className="text-center text-2xl">{loading ? "Loading..." : "Payments"}</h1>
        <input type="text" placeholder="Search..." className="border p-2 rounded my-2 w-full" onChange={(e) => setSearch(e.target.value)} />
        {bookings?.map((b) => (
          <div key={b._id} className="flex justify-between border-b p-2 items-center flex-wrap gap-2">
            <Link to={`/package/${b.packageDetails?._id}`}>{b.packageDetails?.packageName}</Link>
            <p>{b.buyer?.username}</p>
            <p>{b.buyer?.email}</p>
            <p>{b.date}</p>
            <p>${b.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;