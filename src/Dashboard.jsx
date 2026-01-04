import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Link } from "react-router";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch crops from backend
  useEffect(() => {
    fetch("https://farmer-growth-server.vercel.app/crops")
      .then(res => res.json())
      .then(data => { setCrops(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Overview Stats
  const totalCrops = crops.length;
  const availableCrops = crops.filter(c => c.status === "available").length;
  const soldCrops = crops.filter(c => c.status === "sold").length;
  const totalInterests = crops.reduce((acc, c) => acc + (c.interests?.length || 0), 0);

  // Pie chart data
  const pieData = [
    { name: "Available", value: availableCrops },
    { name: "Sold", value: soldCrops },
  ];
  const COLORS = ["#16a34a", "#dc2626"];

  // Bar chart data (quantity per type)
  const barData = [];
  const typeMap = {};
  crops.forEach(c => {
    typeMap[c.type] = (typeMap[c.type] || 0) + c.quantity;
  });
  for (const type in typeMap) {
    barData.push({ type, quantity: typeMap[type] });
  }

  // Line chart data (example: price trend)
  const lineData = crops.map(c => ({ name: c.name, price: c.pricePerUnit }));

  return (
    <div className="min-h-screen bg-green-50 dark:bg-slate-900 p-6 md:p-10">
      <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-8">Welcome, {user?.displayName || "User"}</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Total Crops</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalCrops}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Available Crops</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">{availableCrops}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Sold Crops</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">{soldCrops}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Total Interests</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{totalInterests}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Crop Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Quantity by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Price Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Crops Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Recent Crops</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-green-50 dark:bg-slate-900">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Name</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Price/unit</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Quantity</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Status</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop._id} className="hover:bg-green-50 dark:hover:bg-slate-900 transition">
                <td className="px-4 py-2">{crop.name}</td>
                <td className="px-4 py-2">{crop.type}</td>
                <td className="px-4 py-2">৳{crop.pricePerUnit}/{crop.unit}</td>
                <td className="px-4 py-2">{crop.quantity}</td>
                <td className={`px-4 py-2 font-semibold ${crop.status === "available" ? "text-green-600" : "text-red-600"}`}>
                  {crop.status}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <Link to={`/crops/${crop._id}`} className="btn btn-sm btn-success hover:scale-105">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
