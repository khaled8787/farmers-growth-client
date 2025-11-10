import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const AddCrop = () => {
  const { user } = useContext(AuthContext);

  const handleAddCrop = (e) => {
    e.preventDefault();
    const form = e.target;
    const cropData = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: form.pricePerUnit.value,
      unit: form.unit.value,
      quantity: form.quantity.value,
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    fetch("http://localhost:5000/crops/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("krishilink-token")}`,
      },
      body: JSON.stringify(cropData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Crop added successfully!");
          form.reset();
        }
      })
      .catch(() => toast.error("Failed to add crop"));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
        Add a New Crop
      </h2>
      <form onSubmit={handleAddCrop} className="space-y-3">
        <input name="name" placeholder="Crop Name" className="input input-bordered w-full" required />
        <input name="type" placeholder="Type (e.g., Fruit, Vegetable)" className="input input-bordered w-full" required />
        <input name="pricePerUnit" type="number" placeholder="Price Per Unit" className="input input-bordered w-full" required />
        <input name="unit" placeholder="Unit (kg, ton, bag)" className="input input-bordered w-full" required />
        <input name="quantity" type="number" placeholder="Quantity" className="input input-bordered w-full" required />
        <input name="description" placeholder="Short Description" className="input input-bordered w-full" required />
        <input name="location" placeholder="Location" className="input input-bordered w-full" required />
        <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
        <button className="btn btn-success w-full">Add Crop</button>
      </form>
    </div>
  );
};

export default AddCrop;