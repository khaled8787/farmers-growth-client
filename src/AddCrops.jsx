import { useState } from "react";
import { toast } from "react-toastify";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      ownerEmail: "anonymous@gmail.com",
      ownerName: "Anonymous",
    };

    fetch("http://localhost:5000/crops/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
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
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Add a New Crop</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Crop Name" className="border p-2 rounded"/>
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="border p-2 rounded"/>
        <input name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} placeholder="Price per Unit" type="number" className="border p-2 rounded"/>
        <input name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit" className="border p-2 rounded"/>
        <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" type="number" className="border p-2 rounded"/>
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded"/>
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded"/>
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Crop</button>
      </form>
    </div>
  );
};

export default AddCrop;
