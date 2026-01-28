import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(false);

  const getPackages = async (reset = true) => {
    try {
      setLoading(true);
      const startIndex = reset ? 0 : packages.length;

      let url =
        filter === "offer"
          ? `${API_URL}/api/package/get-packages?searchTerm=${search}&offer=true&startIndex=${startIndex}`
          : filter === "latest"
          ? `${API_URL}/api/package/get-packages?searchTerm=${search}&sort=createdAt&startIndex=${startIndex}`
          : filter === "top"
          ? `${API_URL}/api/package/get-packages?searchTerm=${search}&sort=packageRating&startIndex=${startIndex}`
          : `${API_URL}/api/package/get-packages?searchTerm=${search}&startIndex=${startIndex}`;

      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();

      if (data?.success) {
        const newPackages = reset ? data.packages : [...packages, ...data.packages];
        setPackages(newPackages);
        setShowLoadMore(data.packages.length >= 8); // show load more if 8+ packages fetched
      } else {
        toast.error(data?.message || "Something went wrong!");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Failed to fetch packages!");
    }
  };

  const handleDelete = async (packageId) => {
    if (!confirm("Are you sure? This will permanently delete the package.")) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/package/delete-package/${packageId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      toast[data?.success ? "success" : "error"](data?.message);
      getPackages();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Failed to delete package!");
    }
  };

  useEffect(() => {
    getPackages(true); // reset packages when filter/search changes
  }, [filter, search]);

  return (
    <div className="shadow-xl p-5 rounded-lg w-full">
      <h1 className="text-center text-2xl mb-3">All Packages</h1>

      <input
        type="text"
        placeholder="Search packages..."
        className="p-2 border rounded mb-2 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="flex gap-2 mb-4">
        {["all", "offer", "latest", "top"].map((f) => (
          <li
            key={f}
            className={`p-2 border rounded cursor-pointer ${
              filter === f ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </li>
        ))}
      </ul>

      {loading && <p className="text-center my-2">Loading...</p>}

      {packages.length === 0 && !loading && (
        <p className="text-center text-gray-500">No packages found.</p>
      )}

      {packages.map((pack, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-3 border-b hover:scale-[1.02] transition"
        >
          <Link to={`/package/${pack._id}`}>
            <img
              src={`${API_URL}/images/${pack.packageImages[0]}`}
              alt=""
              className="w-20 h-20 rounded"
            />
          </Link>

          <Link to={`/package/${pack._id}`}>
            <p className="font-semibold hover:underline">{pack.packageName}</p>
          </Link>

          <div className="flex flex-col gap-2">
            <Link to={`/profile/admin/update-package/${pack._id}`}>
              <button className="text-blue-600 hover:underline">Edit</button>
            </Link>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(pack._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {showLoadMore && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => getPackages(false)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPackages;
