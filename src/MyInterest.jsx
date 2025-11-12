import { useEffect, useState } from "react";
import { Link } from "react-router";



const STATUS_ORDER = { accepted: 1, pending: 2, rejected: 3 };

const MyInterests = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  const currentUserEmail = "test@gmail.com"; 

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/interests?userEmail=${encodeURIComponent(currentUserEmail)}`)
      .then(res => res.json())
      .then(data => {
        setInterests(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [currentUserEmail]);

  const sorted = () => {
    if (sortBy === "status") {
      return [...interests].sort((a, b) => {
        const oa = STATUS_ORDER[a.status] || 99;
        const ob = STATUS_ORDER[b.status] || 99;
        if (oa !== ob) return oa - ob;
        return (a.cropName || "").localeCompare(b.cropName || "");
      });
    }
    if (sortBy === "crop") {
      return [...interests].sort((a, b) => (a.cropName || "").localeCompare(b.cropName || ""));
    }
    return interests;
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!interests || interests.length === 0) return <div className="text-center mt-20">You have not sent any interests.</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Interests</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm">Sort:</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border p-1 rounded">
            <option value="default">Default</option>
            <option value="status">By Status (pending → accepted → rejected)</option>
            <option value="crop">By Crop Name</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-200">
            <th className="border px-4 py-2">Crop</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted().map(item => (
            <tr key={item.interestId}>
              <td className="border px-4 py-2">
                <Link to={`/crops/${item.cropId}`} className="text-green-700 underline">
                  {item.cropName}
                </Link>
              </td>
              <td className="border px-4 py-2">{item.ownerName}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.message}</td>
              <td className="border px-4 py-2 capitalize">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyInterests;
