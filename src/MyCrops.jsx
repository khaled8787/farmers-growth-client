import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const MyCrops = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;

  const [crops, setCrops] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserEmail) return;

    fetch("http://localhost:5000/crops")
      .then(res => res.json())
      .then(data => {
        const myCrops = data.filter(
          c => c.owner?.ownerEmail === currentUserEmail
        );
        setCrops(myCrops);
      })
      .catch(err => console.log(err));
  }, [currentUserEmail]);

  useEffect(() => {
    if (!currentUserEmail) return;

    fetch(
      `http://localhost:5000/interests/sellerInterests?userEmail=${encodeURIComponent(
        currentUserEmail
      )}`
    )
      .then(res => res.json())
      .then(data => {
        setInterests(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [currentUserEmail]);

  const handleUpdateInterest = (interestId, status) => {
    fetch(`http://localhost:5000/interests/update/${interestId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, userEmail: currentUserEmail }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success(`Interest ${status} successfully!`);
        setInterests(prev =>
          prev.map(i => (i._id === interestId ? data : i))
        );
      })
      .catch(() => toast.error("Server error!"));
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!crops.length)
    return (
      <div className="text-center mt-20 text-gray-600">
        You haven't posted any crops yet.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-4xl font-bold text-green-700 mb-10 text-center">
        My Crops & Buyer Interests
      </h2>

      {crops.map(crop => {
        const cropInterests = interests.filter(i => i.cropId === crop._id);

        return (
          <div
            key={crop._id}
            className="bg-white rounded-xl shadow-md border mb-10"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold text-green-700">
                  {crop.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  {crop.quantity} {crop.unit} • {crop.type}
                </p>
              </div>
              <img
                src={crop.image}
                alt={crop.name}
                className="w-32 h-24 rounded-lg object-cover"
              />
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">Buyer Interests</h4>

              {cropInterests.length > 0 ? (
                <table className="min-w-full text-sm border rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-green-100 text-left">
                      <th className="px-4 py-2 border">Buyer Email</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cropInterests.map(i => (
                      <tr key={i._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{i.buyerEmail}</td>

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
                                className="bg-green-600 text-white px-3 py-1 rounded-lg"
                                onClick={() =>
                                  handleUpdateInterest(i._id, "Accepted")
                                }
                              >
                                Accept
                              </button>

                              <button
                                className="bg-red-600 text-white px-3 py-1 rounded-lg"
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
              ) : (
                <p className="text-gray-500 italic">No buyer interests yet.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCrops;
