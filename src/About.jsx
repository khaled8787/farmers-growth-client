// About.jsx
import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white dark:from-slate-950 dark:to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
            About <span className="text-green-600 dark:text-green-400">KrishiLink</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Connecting Farmers and Buyers seamlessly. Bringing fresh crops from farm to table.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg"
              alt="Farming"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At KrishiLink, we aim to empower farmers by providing them a platform to showcase their fresh crops directly to buyers, eliminating unnecessary intermediaries. Our goal is to make agricultural trade seamless, transparent, and profitable for both farmers and buyers.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Post and manage crops easily.</li>
              <li>Track your interests and favorite crops.</li>
              <li>Secure and private user profiles.</li>
              <li>Responsive dashboard for managing your activities.</li>
              <li>Real-time updates and notifications.</li>
            </ul>

            
           
          </div>
        </div>

        {/* Statistics / Info Cards */}
        
      </div>
    </section>
  );
};

export default About;
