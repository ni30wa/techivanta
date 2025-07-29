import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-card">
        <h1 className="terms-title">Terms & Conditions</h1>

        <p>
          Welcome to <strong>Techivanta Pvt. Ltd.</strong>. By accessing or
          using our website, services, or applications, you agree to comply with
          and be bound by the following Terms and Conditions.
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our services, you acknowledge that you have read,
            understood, and agree to be bound by these terms. If you do not
            agree, you may not access or use our services.
          </p>
        </section>

        <section>
          <h2>2. Services</h2>
          <p>
            Techivanta provides IT solutions including but not limited to
            software development, web applications, cloud consulting, and
            digital services. All services are subject to availability and may
            be modified or discontinued at our discretion.
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <ul>
            <li>You must use our services for lawful purposes only.</li>
            <li>
              You agree not to misuse, copy, or distribute our content without
              permission.
            </li>
            <li>
              You must not attempt to harm or interfere with our systems or
              networks.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, and materials on this website are
            the property of Techivanta Pvt. Ltd. You may not use or reproduce
            them without our written consent.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            Techivanta shall not be liable for any direct, indirect, incidental,
            or consequential damages arising from your use of our website or
            services.
          </p>
        </section>

        <section>
          <h2>6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to our services
            at any time, with or without notice, for any conduct that we believe
            violates these terms.
          </p>
        </section>

        <section>
          <h2>7. Modifications</h2>
          <p>
            We may update these Terms and Conditions at any time. Changes will
            be posted on this page with a revised effective date. Continued use
            of our services constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be
            subject to the jurisdiction of courts located in Gopalganj, India.
          </p>
        </section>

        <section>
          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p>
            <strong>Email:</strong> techivanta@gmail.com
          </p>
          <p>
            <strong>Address:</strong> Techivanta Pvt. Ltd., Shahi-Complex,
            Gopalganj, India.
          </p>
        </section>

        <p className="effective-date">Effective Date: January 21, 2025</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
