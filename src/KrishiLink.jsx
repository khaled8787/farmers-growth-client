import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🌱",
      title: "Trusted Farmers",
      desc: "Connect directly with verified farmers for fresh produce."
    },
    {
      icon: "🤝",
      title: "Fair Pricing",
      desc: "Transparent pricing for all crops and transactions."
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Quick and reliable delivery to your location."
    },
    {
      icon: "💼",
      title: "Professional Support",
      desc: "Get guidance and support from agricultural experts."
    },
  ];

  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Why Choose KrishiLink?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 duration-300 text-center"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg text-green-700">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
