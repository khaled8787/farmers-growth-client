import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editCrop, setEditCrop] = useState(null); 
  const [deleteCrop, setDeleteCrop] = useState(null); 

  useEffect(() => {
    if (!currentUserEmail) return;
    fetch(`https://farmer-growth-server.vercel.app/crops/myCrops?userEmail=${encodeURIComponent(currentUserEmail)}`)
      .then(res => res.json())
      .then(data => {
        setCrops(data || []);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [currentUserEmail]);

  const handleUpdate = () => {
    fetch(`https://farmer-growth-server.vercel.app/crops/update/${editCrop._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editCrop, userEmail: currentUserEmail }),
    })
      .then(res => res.json())
      .then(updated => {
        setCrops(prev => prev.map(c => c._id === updated._id ? updated : c));
        setEditCrop(null);
        toast.success("Crop updated successfully!");
      })
      .catch(() => toast.error("Update failed"));
  };

  const handleDelete = () => {
    fetch(`https://farmer-growth-server.vercel.app/crops/delete/${deleteCrop._id}?userEmail=${encodeURIComponent(currentUserEmail)}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        setCrops(prev => prev.filter(c => c._id !== deleteCrop._id));
        setDeleteCrop(null);
        toast.success("Crop deleted successfully!");
      })
      .catch(() => toast.error("Delete failed"));
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!crops.length) return <div className="text-center mt-20">You have no crops.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map(crop => (
          <div key={crop._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700">{crop.name}</h3>
              <p>{crop.type} | {crop.quantity} {crop.unit}</p>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => setEditCrop(crop)} className="bg-blue-600 text-white px-3 py-1 rounded-lg">Edit</button>
                <button onClick={() => setDeleteCrop(crop)} className="bg-red-600 text-white px-3 py-1 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Crop</h3>
            <input
              type="text"
              value={editCrop.name}
              onChange={e => setEditCrop({ ...editCrop, name: e.target.value })}
              className="border p-2 w-full mb-2"
              placeholder="Name"
            />
            <input
              type="text"
              value={editCrop.type}
              onChange={e => setEditCrop({ ...editCrop, type: e.target.value })}
              className="border p-2 w-full mb-2"
              placeholder="Type"
            />
            <input
              type="number"
              value={editCrop.pricePerUnit}
              onChange={e => setEditCrop({ ...editCrop, pricePerUnit: e.target.value })}
              className="border p-2 w-full mb-2"
              placeholder="Price per Unit"
            />
            <input
              type="text"
              value={editCrop.unit}
              onChange={e => setEditCrop({ ...editCrop, unit: e.target.value })}
              className="border p-2 w-full mb-2"
              placeholder="Unit"
            />
            <input
              type="number"
              value={editCrop.quantity}
              onChange={e => setEditCrop({ ...editCrop, quantity: e.target.value })}
              className="border p-2 w-full mb-2"
              placeholder="Quantity"
            />
            <input
              type="text"
              value={editCrop.location}
              onChange={e => setEditCrop({ ...editCrop, location: e.target.value })}
              className="border p-2 w-full mb-2"
              placeholder="Location"
            />
            <input
              type="text"
              value={editCrop.image}
              onChange={e => setEditCrop({ ...editCrop, image: e.target.value })}
              className="border p-2 w-full mb-4"
              placeholder="Image URL"
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditCrop(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Delete Crop</h3>
            <p>Are you sure you want to delete <strong>{deleteCrop.name}</strong>?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={() => setDeleteCrop(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
