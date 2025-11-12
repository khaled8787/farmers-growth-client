import { useEffect, useState } from "react";

const MyPosts = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserEmail = "test@gmail.com"; 

  useEffect(() => {
    fetch("http://localhost:5000/crops")
      .then(res => res.json())
      .then(data => {
        const myCrops = data.filter(c => c.owner?.ownerEmail === currentUserEmail);
        setCrops(myCrops);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:5000/crops/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(() => {
          setCrops(prev => prev.filter(c => c._id !== id));
          alert("Post deleted successfully!");
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (id) => {
    const crop = crops.find(c => c._id === id);
    const newName = prompt("Enter new crop name:", crop.name);
    if (!newName) return;

    fetch(`http://localhost:5000/crops/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...crop, name: newName }),
    })
      .then(res => res.json())
      .then(() => {
        setCrops(prev => prev.map(c => (c._id === id ? { ...c, name: newName } : c)));
        alert("Crop name updated successfully!");
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (crops.length === 0) return <div className="text-center mt-20">You have no crops posted.</div>;

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Posts</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-green-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Price/Unit</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map(c => (
            <tr key={c._id}>
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.type}</td>
              <td className="border px-4 py-2">৳{c.pricePerUnit}/{c.unit}</td>
              <td className="border px-4 py-2">{c.quantity}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                {c.owner?.ownerEmail === currentUserEmail && (
                  <>
                    <button
                      onClick={() => handleEdit(c._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;
