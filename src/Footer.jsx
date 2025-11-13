import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2">
        <p className="text-sm md:text-base">
          © 2025 <span className="font-semibold">KrishiLink</span>. Connecting Farmers, Traders & Consumers.
        </p>
        <p className="text-sm md:text-base">
          Designed for agriculture enthusiasts & professionals.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
