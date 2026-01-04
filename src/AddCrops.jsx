import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthProvider";

const AddCrop = () => {
  const { user } = useContext(AuthContext);
  const ownerEmail = user?.email;
  const ownerName = user?.displayName || user?.name;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    images: [""] // ✅ একটাই default input
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ handle individual image input changes
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  // ✅ add new image input dynamically
  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://farmer-growth-server.vercel.app/crops/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...formData, ownerEmail, ownerName }),
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
          images: [""], // reset
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
    <div className="min-h-[80vh] flex items-center justify-center bg-green-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6">
          Add New Crop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />
          <input
            type="number"
            name="pricePerUnit"
            placeholder="Price per unit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
          />

          {/* ✅ Dynamic multiple images */}
          <div className="space-y-2">
            {formData.images.map((img, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Image ${idx + 1} URL`}
                value={img}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                required
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg"
              />
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition transform hover:scale-105 shadow-md hover:shadow-xl"
            >
              + Add Image
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-success w-full py-2 text-lg font-semibold hover:scale-105 transform transition-shadow shadow-md hover:shadow-xl rounded-lg ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Crop"}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </div>
  );
};

export default AddCrop;
