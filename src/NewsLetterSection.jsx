import React, { useState } from "react";
import { toast } from "react-toastify";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email!");
      return;
    }
    toast.success(`Subscribed successfully with ${email}!`);
    setEmail("");
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-green-300/30 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-green-200/30 dark:bg-green-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          Stay Updated with <span className="text-green-600 dark:text-green-400">KrishiLink</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Subscribe to our newsletter for the latest updates on crops, farming tips, and exclusive offers.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:text-white"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg transition transform hover:-translate-y-1"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
