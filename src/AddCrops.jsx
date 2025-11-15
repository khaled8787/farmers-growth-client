import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCrop = ({ currentUserEmail, currentUserName }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });
console.log("Current User Email:", currentUserEmail);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/crops/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...formData, ownerEmail: currentUserEmail, ownerName: currentUserName }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Crop added successfully!");
        setFormData({
          name: "",
          type: "",
          pricePerUnit: "",
          unit: "",
          quantity: "",
          description: "",
          location: "",
          image: "",
        });
        setTimeout(() => navigate("/my-posts"), 1500);
      } else {
        toast.error(data.message || "Failed to add crop");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">Add New Crop</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        {/* Type */}
        <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        {/* Price per unit */}
        <input type="number" name="pricePerUnit" placeholder="Price per unit" value={formData.pricePerUnit} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        {/* Unit */}
        <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        {/* Quantity */}
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        {/* Description */}
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded" rows={3}></textarea>
        {/* Location */}
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        {/* Image */}
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400">
          {loading ? "Adding..." : "Add Crop"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default AddCrop;
