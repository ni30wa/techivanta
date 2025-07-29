import React, { useState } from "react";
import "./Support.css";
import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(`${baseURL}/api/contact`, formData);
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="support-wrapper">
      <div className="support-card">
        <h1>Support Center</h1>

        <div className="support-grid">
          {/* Contact Info and FAQs */}
          <div className="support-info">
            <div>
              <h2>Need Help?</h2>
              <p>We usually respond within 24 hours.</p>
              <p className="mt-2">
                📧 Email:{" "}
                <a href="mailto:techivanta@gmail.com">techivanta@gmail.com</a>
              </p>
              <p>
                📞 Phone: <a href="tel:+918986049042">+91-89860-49042</a>
              </p>
            </div>

            <div className="support-faq mt-6">
              <h2>FAQs</h2>
              <ul>
                <li>How fast is your response time?</li>
                <li>Can I request a call back?</li>
                <li>What issues do you handle?</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="support-form">
            <h2>Submit a Request</h2>

            <div className="form-row">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              required
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>

            <button type="submit">Send Message</button>

            {status && <p className="status">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
