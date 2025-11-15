import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || null;

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!userEmail) return;

  setLoading(true);

   fetch(`http://localhost:5000/interests/myInterests?userEmail=${encodeURIComponent(userEmail)}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.log("NOT ARRAY =>", data);
        setInterests([]);
      } else {
        setInterests(data);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [userEmail]);


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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((item) => (
            <div key={item._id} className="p-5 shadow rounded-lg border bg-white">
              <h3 className="text-xl font-semibold">{item.cropName}</h3>
              <p className="text-gray-600">Seller: {item.sellerEmail}</p>
              <p className="text-gray-600">Status: {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterest;
