import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🌱",
      title: "Trusted Farmers",
      desc: "Connect directly with verified farmers for fresh and reliable produce.",
    },
    {
      icon: "🤝",
      title: "Fair Pricing",
      desc: "Transparent and fair pricing ensuring value for both buyers and farmers.",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Efficient logistics system to ensure timely and safe delivery.",
    },
    {
      icon: "💼",
      title: "Professional Support",
      desc: "Expert guidance and support for smarter agricultural decisions.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">

      {/* Background Blur Shapes */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-green-300/30 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-200/30 dark:bg-green-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Why Choose <span className="text-green-600 dark:text-green-400">KrishiLink?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            We bridge the gap between farmers and buyers with trust, technology, and transparency.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 hover:rotate-[0.4deg]"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {f.desc}
              </p>

              {/* Bottom Glow Line */}
              <div className="mt-5 h-1 w-10 mx-auto rounded-full bg-green-500/0 group-hover:bg-green-500 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
