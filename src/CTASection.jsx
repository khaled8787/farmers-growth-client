import React from "react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Join <span className="text-yellow-300">KrishiLink</span> Today!
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Start selling your crops directly to buyers or explore fresh crops from verified farmers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/add-crop">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-6 py-3 rounded-full shadow-lg transform transition hover:-translate-y-1 hover:scale-105">
              Start Selling
            </button>
          </Link>

          <Link to="/all-crops">
            <button className="bg-white hover:bg-white/90 text-green-700 font-semibold px-6 py-3 rounded-full shadow-lg transform transition hover:-translate-y-1 hover:scale-105">
              Explore Crops
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
