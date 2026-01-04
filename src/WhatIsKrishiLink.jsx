import React from "react";
import { Leaf, Users, ShoppingBasket } from "lucide-react";

const WhatIsKrishiLink = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      
      {/* Background decorative blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-300/30 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-green-200/30 dark:bg-green-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          What is <span className="text-green-600 dark:text-green-400">KrishiLink?</span>
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-base md:text-lg mb-14">
          KrishiLink is a smart agriculture platform that connects farmers, traders,
          and buyers directly—ensuring fair pricing, transparency, and easier access
          to fresh agricultural products.
        </p>

        {/* 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-3 hover:rotate-[0.5deg]">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20 group-hover:scale-110 transition">
                <Leaf className="text-green-600 dark:text-green-400" size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Farmer Empowerment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Farmers can post crops directly, manage listings, and reach buyers
              without middlemen.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-3 hover:rotate-[-0.5deg]">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20 group-hover:scale-110 transition">
                <Users className="text-green-600 dark:text-green-400" size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Trusted Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              A secure platform where buyers and sellers connect with verified
              profiles and transparent information.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-3 hover:rotate-[0.5deg]">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-500/20 group-hover:scale-110 transition">
                <ShoppingBasket className="text-green-600 dark:text-green-400" size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Easy Crop Discovery
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Buyers can explore crops by category, location, and interest—making
              agriculture smarter and faster.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsKrishiLink;
