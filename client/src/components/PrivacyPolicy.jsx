import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-wrapper">
      <div className="privacy-card">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p>
          At <strong>Techivanta Pvt. Ltd.</strong>, we are committed to
          protecting your privacy. This Privacy Policy describes how we collect,
          use, and safeguard your information when you interact with our website
          or services.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>Personal Information (name, email, phone number, etc.)</li>
            <li>Usage data (pages visited, time on site, etc.)</li>
            <li>Device and browser information</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and improve our services</li>
            <li>To respond to inquiries or customer service requests</li>
            <li>To personalize your experience</li>
            <li>To analyze website traffic and usage</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Sharing & Security</h2>
          <p>
            We do not sell your personal information. Your data may be shared
            with trusted partners to perform services on our behalf (e.g.,
            hosting, analytics), under strict confidentiality agreements. We use
            industry-standard security measures to protect your information.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. You
            can choose to disable cookies through your browser settings, but it
            may affect the functionality of some parts of our website.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data.
            You can also opt-out of marketing communications at any time by
            contacting us at <strong>support@techivanta.com</strong>.
          </p>
        </section>

        <section>
          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page with a revised effective date.
          </p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have questions or concerns about this policy, please contact
            us at:
          </p>
          <p>
            <strong>Email:</strong> techivanta@gmail.com
          </p>
          <p>
            <strong>Address:</strong> Techivanta Pvt. Ltd., Shahi-Complex
            Gopalganj, India.
          </p>
        </section>

        <p className="effective-date">Effective Date: January 21, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
