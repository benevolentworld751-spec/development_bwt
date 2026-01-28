import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const RatingsReviews = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" or "most"
  const [search, setSearch] = useState("");
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  // Fetch packages with optional pagination
  const getPackages = async (startIndex = 0) => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/package/get-packages?searchTerm=${search}&sort=${
        filter === "most" ? "packageTotalRatings" : "packageRating"
      }&startIndex=${startIndex}`;

      const res = await fetch(url, { credentials: "include" }); // Cookie-based auth
      const data = await res.json();

      if (data?.success) {
        if (startIndex > 0) {
          setPackages((prev) => [...prev, ...data.packages]);
        } else {
          setPackages(data.packages);
        }

        setShowMoreBtn(data.packages?.length >= 8); // Show button if more than 8
      } else {
        toast.error(data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages(); // fetch whenever filter or search changes
  }, [filter, search]);

  const onShowMoreClick = () => {
    getPackages(packages.length);
  };

  return (
    <div className="shadow-xl rounded-lg w-full flex flex-col p-5 justify-center gap-2">
      {loading && <h1 className="text-center text-lg">Loading...</h1>}

      {/* Search input */}
      <div className="mb-2">
        <input
          className="p-2 rounded border w-full"
          type="text"
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter tabs */}
      <div className="my-2 border-y-2 py-2">
        <ul className="w-full flex justify-around">
          {["all", "most"].map((f) => (
            <li
              key={f}
              className={`cursor-pointer hover:scale-95 border rounded-xl p-2 transition-all duration-300 ${
                filter === f ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : "Most Rated"}
            </li>
          ))}
        </ul>
      </div>

      {/* Packages list */}
      {packages.length > 0 ? (
        packages.map((pack, i) => (
          <div
            key={i}
            className="border rounded-lg w-full flex p-3 justify-between gap-2 flex-wrap items-center hover:scale-[1.02] transition-all duration-300"
          >
            <Link to={`/package/ratings/${pack._id}`}>
              <img
                src={`${API_URL}/images/${pack?.packageImages[0]}`}
                alt={pack.packageName}
                className="w-20 h-20 rounded"
              />
            </Link>
            <Link to={`/package/ratings/${pack._id}`}>
              <p className="font-semibold hover:underline">{pack.packageName}</p>
            </Link>
            <p className="flex items-center gap-1">
              <Rating value={pack.packageRating} precision={0.1} readOnly />
              ({pack.packageTotalRatings})
            </p>
          </div>
        ))
      ) : (
        !loading && <h1 className="text-center text-2xl">No Ratings Available!</h1>
      )}

      {/* Show More button */}
      {showMoreBtn && (
        <button
          onClick={onShowMoreClick}
          className="text-sm bg-green-700 text-white hover:underline p-2 m-3 rounded text-center w-max self-center"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default RatingsReviews;
