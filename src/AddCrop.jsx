import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCrop = () => {
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
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(" Crop added successfully!");
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

        setTimeout(() => {
          navigate("/my-posts");
        }, 2000);
      } else {
        toast.error(data.message || " Failed to add crop");
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
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">
        Add New Crop
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Tomato"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Type</label>
          <input
            type="text"
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Vegetable"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price per unit</label>
          <input
            type="number"
            name="pricePerUnit"
            required
            value={formData.pricePerUnit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 55"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Unit</label>
          <input
            type="text"
            name="unit"
            required
            value={formData.unit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. kg / ton / bag"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Estimated Quantity</label>
          <input
            type="number"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
            placeholder="Short details about the crop..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Bogura"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://example.com/crop.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Crop"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default AddCrop;
