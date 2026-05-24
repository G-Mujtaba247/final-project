import React from "react";
import WebLayout from "../../layout/WebLayout";

const Terms = () => {
  return (
    <WebLayout>
    <section className="max-w-5xl mt-10 mx-auto px-4 py-16 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="text-center text-gray-600 mb-12">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      {/* Introduction */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or booking a tour through <strong>Explore Pakistan</strong>,
          you agree to comply with and be legally bound by these Terms of Service.
          If you do not agree with these terms, please refrain from using our
          website or booking platforms.
        </p>
      </div>

      {/* Services */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">2. Our Services</h2>
        <p>
          Explore Pakistan provides guided and unguided travel experiences across
          Pakistan’s northern regions including Hunza, Skardu, Naran Kaghan, Swat,
          Murree, Chitral, and other tourist destinations. Travel itineraries,
          accommodation details, transport arrangements, and pricing may vary based
          on availability and seasonal conditions.
        </p>
      </div>

      {/* Eligibility */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">3. Eligibility</h2>
        <p>
          To book a tour, you must:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be at least 18 years old or have consent from a guardian.</li>
          <li>Provide accurate personal and travel information.</li>
          <li>Agree to comply with local laws and safety regulations.</li>
        </ul>
      </div>

      {/* Booking & Payments */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">4. Bookings & Payments</h2>
        <p>
          All bookings are subject to availability. To confirm your reservation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A deposit or full payment may be required.</li>
          <li>Prices may change due to fuel cost fluctuations or peak seasons.</li>
          <li>
            Payment details are handled securely by third-party payment gateways.
          </li>
        </ul>
      </div>

      {/* Cancellations */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">5. Cancellations & Refunds</h2>
        <p>Cancellation policies vary by tour and season. Typically:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancellations made 7+ days before departure may be eligible for a refund.</li>
          <li>Cancellations made within 48 hours may not be refundable.</li>
          <li>No-show on the departure date results in 0% refund.</li>
        </ul>
        <p>
          Weather conditions, landslides, or road closures in northern areas may cause
          rescheduling; in such cases, we will assist with alternative arrangements.
        </p>
      </div>

      {/* User Responsibilities */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">6. User Responsibilities</h2>
        <p>By booking with us, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Follow tour guide instructions for safety.</li>
          <li>Avoid damaging natural sites or historical locations.</li>
          <li>Respect local culture, traditions, and wildlife.</li>
          <li>Ensure proper physical fitness for trekking or high-altitude trips.</li>
        </ul>
      </div>

      {/* Travel Conditions */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          7. Travel Conditions & Risks
        </h2>
        <p>
          Northern Pakistan includes mountainous terrain and unpredictable weather.
          While we prioritize your safety, certain risks such as landslides,
          altitude sickness, and transport delays are beyond our control.
        </p>
      </div>

      {/* Prohibited Uses */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">8. Prohibited Activities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Using the website for fraudulent bookings.</li>
          <li>Providing false identity or payment details.</li>
          <li>Engaging in illegal activities during tours.</li>
          <li>Misusing our content, images, or branding.</li>
        </ul>
      </div>

      {/* Liability */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          9. Limitation of Liability
        </h2>
        <p>
          Explore Pakistan is not responsible for personal injuries, lost items,
          delays, or damages caused by:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Third-party transport providers</li>
          <li>Hotel partners</li>
          <li>Natural disasters or weather conditions</li>
          <li>Accidents due to user negligence</li>
        </ul>
      </div>

      {/* Changes */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          10. Changes to These Terms
        </h2>
        <p>
          We may update these Terms of Service from time to time. Updates will be
          posted on this page with a revised date. Continued use of our services
          means you agree to the updated terms.
        </p>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">11. Contact Us</h2>
        <p>If you have questions regarding these Terms, contact us:</p>
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

export default Terms;
