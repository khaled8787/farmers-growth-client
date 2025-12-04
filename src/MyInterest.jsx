import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || null;

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  const fetchInterests = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const res = await fetch(`https://farmer-growth-server.vercel.app/interests/myInterests?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      if (!Array.isArray(data)) {
        setInterests([]);
      } else {
        setInterests(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch interests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, [userEmail]);

  const handleUpdateStatus = async (interestId, cropId, newStatus) => {
    try {
      const res = await fetch(`https://farmer-growth-server.vercel.app/interests/update/${interestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, userEmail }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update");

      setInterests(prev =>
        prev.map(i => (i._id === interestId ? { ...i, status: newStatus } : i))
      );

      if (newStatus === "accepted") {
        await fetch(`https://farmer-growth-server.vercel.app/crops/update/${cropId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: data.updatedQuantity }),
        });
      }

      toast.success(`Interest ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleSort = field => {
    let order = "asc";
    if (sortField === field && sortOrder === "asc") order = "desc";
    setSortField(field);
    setSortOrder(order);

    setInterests(prev =>
      [...prev].sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  if (!userEmail)
    return <h2 className="text-center mt-20">Please login to view interests.</h2>;

  if (loading)
    return <h2 className="text-center mt-20">Loading your interests...</h2>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-green-700">My Interests</h2>

      {interests.length === 0 ? (
        <p className="text-gray-500">You haven’t shown interest in any crops yet.</p>
      ) : (
        <>
          <div className="mb-4 flex gap-4">
            <button onClick={() => handleSort("cropName")} className="btn btn-outline btn-sm">
              Sort by Crop Name
            </button>
            <button onClick={() => handleSort("status")} className="btn btn-outline btn-sm">
              Sort by Status
            </button>
            <button onClick={() => handleSort("quantity")} className="btn btn-outline btn-sm">
              Sort by Quantity
            </button>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="border px-4 py-2">Crop Name</th>
                <th className="border px-4 py-2">Owner</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {interests.map(item => (
                <tr key={item._id} className="text-center">
                  <td className="border px-4 py-2">{item.cropName}</td>
                  <td className="border px-4 py-2">{item.sellerEmail}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.message || "-"}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    {userEmail === item.sellerEmail && item.status === "pending" && (
                      <>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => handleUpdateStatus(item._id, item.cropId, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleUpdateStatus(item._id, item.cropId, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MyInterest;
