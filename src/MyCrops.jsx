import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCrops = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;

  const [crops, setCrops] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserEmail) return;

    fetch("https://farmer-growth-server.vercel.app/crops")
      .then(res => res.json())
      .then(data => {
        const myCrops = (data || []).filter(
          c => c.owner?.ownerEmail === currentUserEmail
        );
        setCrops(myCrops);
      })
      .catch(err => console.error(err));
  }, [currentUserEmail]);

  useEffect(() => {
    if (!currentUserEmail) return;
  
    setLoading(true);
    fetch("https://farmer-growth-server.vercel.app/crops")
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Ensure data is an array
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        const myCrops = data.filter(
          c => c.owner?.ownerEmail === currentUserEmail
        );
        setCrops(myCrops);
      })
      .catch(err => {
        console.error("Error fetching crops:", err);
        toast.error("Failed to load crops from server!");
        setCrops([]);
      })
      .finally(() => setLoading(false));
  }, [currentUserEmail]);
  
  const handleUpdateInterest = (interestId, status) => {
    fetch(`https://farmer-growth-server.vercel.app/interests/update/${interestId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, userEmail: currentUserEmail }),
    })
      .then(res => res.json())
      .then(updatedInterest => {
        toast.success(`Interest ${status} successfully!`);

        setInterests(prev =>
          prev.map(i => (i._id === interestId ? updatedInterest : i))
        );

        if (status === "Accepted") {
          setCrops(prev =>
            prev.map(c => {
              if (c._id === updatedInterest.cropId) {
                return {
                  ...c,
                  quantity: c.quantity - updatedInterest.quantity,
                };
              }
              return c;
            })
          );
        }
      })
      .catch(() => toast.error("Server error!"));
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  if (!crops.length)
    return (
      <div className="text-center mt-20 text-gray-600">
        You haven't posted any crops yet.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
        My Crops & Buyer Interests
      </h2>

      {crops.map(crop => {
        const cropInterests = interests.filter(i => i.cropId === crop._id);

        return (
          <div
            key={crop._id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 mb-10 overflow-hidden hover:scale-105 transform transition-all duration-300"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400">
                  {crop.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {crop.quantity} {crop.unit} • {crop.type}
                </p>
              </div>
              <img
                src={crop.images[0]}
                alt={crop.name}
                className="w-32 h-24 rounded-xl object-cover shadow-md"
              />
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Buyer Interests
              </h4>

              {cropInterests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border rounded-xl overflow-hidden text-sm">
                    <thead className="bg-green-100 dark:bg-green-900 text-left">
                      <tr>
                        <th className="px-4 py-2 border">Buyer Email</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropInterests.map(i => (
                        <tr key={i._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <td className="border px-4 py-2">{i.buyerEmail}</td>
                          <td className="border px-4 py-2">{i.quantity}</td>
                          <td className="border px-4 py-2">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-xs ${
                                i.status === "Pending"
                                  ? "bg-yellow-500"
                                  : i.status === "Accepted"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                            >
                              {i.status}
                            </span>
                          </td>
                          <td className="border px-4 py-2 text-center space-x-2">
                            {i.status === "Pending" && (
                              <>
                                <button
                                  className="bg-green-600 text-white px-3 py-1 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
                                  onClick={() =>
                                    handleUpdateInterest(i._id, "Accepted")
                                  }
                                >
                                  Accept
                                </button>

                                <button
                                  className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
                                  onClick={() =>
                                    handleUpdateInterest(i._id, "Rejected")
                                  }
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
                </div>
              ) : (
                <p className="text-gray-500 italic dark:text-gray-400">
                  No buyer interests yet.
                </p>
              )}
            </div>
          </div>
        );
      })}

      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default MyCrops;
