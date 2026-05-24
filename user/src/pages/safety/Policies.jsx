import React from "react";
import WebLayout from "../../layout/WebLayout";

const Policies = () => {
  return (
    <WebLayout>
    <section className="max-w-5xl mt-10 mx-auto px-4 py-16 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-center text-gray-600 mb-12">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      {/* Introduction */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to <strong>Explore Pakistan</strong>! We are committed to
          protecting your personal information and your right to privacy. This
          Privacy Policy explains how we collect, use, store, and safeguard your
          data when you browse our website or book tours across Pakistan’s
          northern regions, including Hunza, Skardu, Naran Kaghan, Swat, Chitral,
          and more.
        </p>
      </div>

      {/* Information Collection */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          2. Information We Collect
        </h2>

        <p>We collect the following types of information:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            address, and identification details (if required for booking).
          </li>
          <li>
            <strong>Booking Details:</strong> Selected tour packages, travel
            dates, group size, preferences.
          </li>
          <li>
            <strong>Payment Information:</strong> Processed securely through
            third-party payment gateways (we do not store card details).
          </li>
          <li>
            <strong>Usage Data:</strong> IP address, browser type, device
            information, and pages visited on our site.
          </li>
        </ul>
      </div>

      {/* Use of Information */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          3. How We Use Your Information
        </h2>

        <p>Your information is used to:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Process and confirm your tour bookings.</li>
          <li>Improve our website and user experience.</li>
          <li>Provide customer support and travel guidance.</li>
          <li>Send booking confirmations, updates, and promotional offers.</li>
          <li>Ensure safety and compliance with local travel regulations.</li>
        </ul>
      </div>

      {/* Sharing Info */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          4. Sharing Your Information
        </h2>

        <p>
          We <strong>do not sell or trade</strong> your personal data. We may
          share information only with:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Trusted tour partners, drivers, or hotel operators involved in your
            travel itinerary.
          </li>
          <li>Payment processors for secure transaction handling.</li>
          <li>
            Government authorities if legally required for travel verification.
          </li>
        </ul>
      </div>

      {/* Data Security */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">5. Data Protection & Security</h2>
        <p>
          We use industry-standard security practices to protect your data from
          unauthorized access, alteration, or disclosure. However, no online
          transmission is 100% secure, so we encourage you to use strong
          passwords and keep your devices protected.
        </p>
      </div>

      {/* Cookies */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">6. Cookies & Tracking Tools</h2>
        <p>
          We use cookies to personalize your experience, improve loading speed,
          and analyze website traffic. You can disable cookies in your browser
          settings anytime.
        </p>
      </div>

      {/* Third-Party Links */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          7. Third-Party Websites & Services
        </h2>
        <p>
          Our site may contain links to external websites such as hotels,
          transport services, or tourism blogs. We are not responsible for their
          privacy practices and encourage you to review their policies.
        </p>
      </div>

      {/* Rights */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal data.</li>
          <li>Request corrections or updates.</li>
          <li>Request deletion of your information.</li>
          <li>Opt-out of promotional communications.</li>
        </ul>
      </div>

      {/* Changes */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">9. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how your data is
          handled, please contact us:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Email: info@explorepakistan.com</li>
          <li>Phone: +92-342-4493250</li>
          <li>Address: Islamabad, Pakistan</li>
        </ul>
      </div>
    </section>
    </WebLayout>
  );
};

export default Policies;
