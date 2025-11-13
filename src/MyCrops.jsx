import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyCrops = () => {
  const defaultOwnerEmail = "test@gmail.com";
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/crops`)
      .then(res => res.json())
      .then(data => {
        const myCrops = data.filter(c => c.owner?.ownerEmail === defaultOwnerEmail);
        setCrops(myCrops);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleUpdateInterest = (cropId, interestId, status) => {
    fetch(`http://localhost:5000/interests/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cropId, interestId, status, ownerEmail: defaultOwnerEmail }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.interest) {
          setCrops(prev =>
            prev.map(c =>
              c._id === cropId
                ? {
                    ...c,
                    interests: c.interests.map(i =>
                      i._id === interestId ? data.interest : i
                    ),
                  }
                : c
            )
          );
          toast.success(`Interest ${status} successfully!`);
        } else {
          toast.error(data.message || "Failed to update interest.");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Server error!");
      });
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!crops.length) return <div className="text-center mt-20">No crops found.</div>;

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Crops & Interests</h2>
      {crops.map(crop => (
        <div key={crop._id} className="mb-8 border p-4 rounded shadow">
          <h3 className="text-xl font-bold text-green-800">{crop.name}</h3>
          <p>Quantity: {crop.quantity}</p>
          {crop.interests && crop.interests.length > 0 ? (
            <table className="w-full border-collapse mt-2">
              <thead>
                <tr className="bg-green-200">
                  <th className="border px-2 py-1">Buyer</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Qty</th>
                  <th className="border px-2 py-1">Message</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {crop.interests.map(i => (
                  <tr key={i._id}>
                    <td className="border px-2 py-1">{i.userName}</td>
                    <td className="border px-2 py-1">{i.userEmail}</td>
                    <td className="border px-2 py-1">{i.quantity}</td>
                    <td className="border px-2 py-1">{i.message}</td>
                    <td className="border px-2 py-1 capitalize">{i.status}</td>
                    <td className="border px-2 py-1 space-x-2">
                      {i.status === "pending" && (
                        <>
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded"
                            onClick={() =>
                              handleUpdateInterest(crop._id, i._id, "accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 text-white px-2 py-1 rounded"
                            onClick={() =>
                              handleUpdateInterest(crop._id, i._id, "rejected")
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
            <p className="mt-2 text-gray-500">No interests yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCrops;
