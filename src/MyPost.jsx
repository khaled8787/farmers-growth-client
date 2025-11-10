import { useEffect } from "react";

useEffect(() => {
  fetch("http://localhost:5000/crops/my-posts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("krishilink-token")}`
    }
  })
    .then(res => res.json())
    .then(data => setMyCrops(data));
}, []);
