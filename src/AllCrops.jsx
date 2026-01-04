import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
    <div className="h-56 bg-gray-300 dark:bg-slate-700"></div>
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-300 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-2/3"></div>
      <div className="h-10 bg-gray-300 dark:bg-slate-700 rounded mt-4"></div>
    </div>
  </div>
);

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortPrice, setSortPrice] = useState("");

  // 🔥 Pagination states (NEW)
  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://farmer-growth-server.vercel.app/crops?page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.crops) {
          setCrops(data.crops);
          setTotalPages(data.totalPages);
        } else {
          setCrops(data || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  // 🔎 Filter + Search + Sort Logic (UNCHANGED)
  const filteredCrops = crops
    .filter(
      (crop) =>
        crop.name.toLowerCase().includes(search.toLowerCase()) ||
        crop.location.toLowerCase().includes(search.toLowerCase())
    )
    .filter((crop) =>
      statusFilter === "all" ? true : crop.status === statusFilter
    )
    .sort((a, b) => {
      if (sortPrice === "low") return a.pricePerUnit - b.pricePerUnit;
      if (sortPrice === "high") return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
            All <span className="text-green-600">Crops</span>
          </h2>
        </div>

        {/* 🔍 Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between">
          <input
            type="text"
            placeholder="Search by crop or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border dark:bg-slate-900"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:bg-slate-900"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold Out</option>
          </select>

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="px-4 py-2 rounded-lg border dark:bg-slate-900"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* Loader */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && filteredCrops.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCrops.map((crop) => (
              <div
                key={crop._id}
                className="group bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col
                hover:-translate-y-3 hover:shadow-2xl transition-all duration-300
                backdrop-blur-lg"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={crop.images?.[0] || "https://via.placeholder.com/400x300?text=Crop"}
                    alt={crop.name}
                    className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full text-white shadow
                    ${
                      crop.status === "available"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {crop.status}
                  </span>

                  {/* Rating */}
                  <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    ⭐ {crop.rating || 4.5}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{crop.name}</h3>

                  <p className="text-sm text-gray-500 mb-1">
                    💰 ৳{crop.pricePerUnit}/{crop.unit}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {crop.description ||
                      "Fresh crops directly from farmers."}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    📍 {crop.location}
                  </p>

                  <Link to={`/crops/${crop._id}`} className="mt-auto">
                    <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-lg hover:shadow-xl transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredCrops.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No crops found.
          </div>
        )}

        {/* 🔢 Pagination (NEW) */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="text-black px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="text-black px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCrops;
