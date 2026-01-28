// 3️⃣ AllUsers.jsx
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/getAllUsers?searchTerm=${search}`, { credentials: "include" });
      const data = await res.json();
      if (data?.success) setUsers(data.users || data);
      else toast.error(data?.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/user/delete-user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      toast[data?.success ? "success" : "error"](data?.message);
      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full sm:w-[95%] bg-white shadow-md rounded p-3">
        <h1 className="text-center text-2xl">{loading ? "Loading..." : "All Users"}</h1>
        <input type="text" placeholder="Search..." className="border p-2 rounded my-2 w-full" onChange={(e) => setSearch(e.target.value)} />
        <div>
          {users?.map((user) => (
            <div key={user._id} className="flex justify-between border-b p-2 items-center">
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <button onClick={() => deleteUser(user._id)} disabled={loading} className="text-red-500 p-2">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;