import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden pt-16 pb-10">
      
      {/* Background 3D shapes */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-green-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About / Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-green-400">KrishiLink</h3>
          <p className="text-gray-300">
            Connecting Farmers, Traders & Consumers with trust and transparency. Your one-stop agriculture platform.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-400">Contact Us</h3>
          <p className="flex items-center gap-2 text-gray-300">
            <FaEnvelope /> mdkhaledmahmud01737@gmail.com
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <FaPhoneAlt /> +880 1737878716
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <FaMapMarkerAlt /> Natore, Bangladesh
          </p>
        </div>

        {/* Social / Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-400">Follow & Links</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/mahmud.36593" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 p-3 rounded-full transform hover:scale-110 transition duration-300">
              <FaFacebookF />
            </a>
            <a href="https://x.com/KhaledMahm19701" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 p-3 rounded-full transform hover:scale-110 transition duration-300">
              <FaTwitter />
            </a>
            
            <a href="https://www.linkedin.com/in/khaledmahmud8787/" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 p-3 rounded-full transform hover:scale-110 transition duration-300">
              <FaLinkedinIn />
            </a>
          </div>

          <div className="flex flex-col gap-2 mt-4 text-gray-300">
            <Link to={'/'} className="hover:text-green-400 transition">Home</Link>
            <Link to={'/my-profile'} className="hover:text-green-400 transition">Profile</Link>
            <Link to={'/all-crops'} className="hover:text-green-400 transition">Explore Crops</Link>
            <Link to={'/add-crop'} className="hover:text-green-400 transition">Create Crop</Link>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
        © 2025 KrishiLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
