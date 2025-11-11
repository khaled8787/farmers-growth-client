import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/crops")
      .then(res => res.json())
      .then(data => {
        setCrops(data);
        setFiltered(data);
      });
  }, []);

  
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(crops);
    } else {
      const filteredCrops = crops.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredCrops);
    }
  }, [search, crops]);

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        All Crops
      </h2>

      
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search crops..."
          className="border p-2 rounded w-full max-w-md focus:outline-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(crop => (
            <div
              key={crop._id}
              className="border rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-green-800">{crop.name}</h3>
                <p className="text-gray-700 mt-1">Type: {crop.type}</p>
                <p className="text-gray-700 mt-1">
                  Price: {crop.pricePerUnit} / {crop.unit}
                </p>
                <p className="text-gray-700 mt-1">Quantity: {crop.quantity}</p>
                <p className="text-gray-500 mt-2">
                  {crop.description?.slice(0, 80)}...
                </p>
                <p className="text-gray-500 mt-2">Location: {crop.location}</p>
                <Link
                  to={`/crops/${crop._id}`}
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No crops found.
        </p>
      )}
    </div>
  );
};

export default AllCrops;
