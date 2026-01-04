// Privacy.jsx
import React from "react";
import { Link } from "react-router";

const Privacy = () => {
  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-green-50 to-green-100 dark:from-slate-950 dark:to-slate-900 py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 md:p-16 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 text-center mb-8">
          Privacy Policy & Terms
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Welcome to KrishiLink! Your privacy is very important to us. This page outlines how we collect, use, and protect your information while using our platform.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
            Privacy Policy
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>We collect personal information like name, email, and crops posted to provide a better user experience.</li>
            <li>All data is stored securely and is never shared with third parties without consent.</li>
            <li>Users can request deletion of their account and personal data at any time.</li>
            <li>We use cookies and analytics to improve website functionality and performance.</li>
          </ul>
        </section>

        {/* Terms of Service */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
            Terms of Service
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>All users must register with accurate information and maintain a valid account.</li>
            <li>Crops posted should be genuine and follow all local regulations.</li>
            <li>KrishiLink reserves the right to suspend or remove accounts violating these terms.</li>
            <li>Payments, orders, and disputes are handled responsibly, following ethical standards.</li>
          </ul>
        </section>


      </div>
    </section>
  );
};

export default Privacy;
