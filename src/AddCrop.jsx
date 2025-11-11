import { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

const AddCrop = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/crops/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name, price }),
    });
    const data = await res.json();
    if (res.ok) alert("Crop added successfully");
    else alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Crop Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button type="submit">Add Crop</button>
    </form>
  );
};

export default AddCrop;
