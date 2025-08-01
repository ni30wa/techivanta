import { useState } from "react";
import axios from "axios";
import "./Contact.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    phone === "" || /^[6-9]\d{9}$/.test(phone);

  const isValidMessage = (message) => {
    const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
    return wordCount <= 300;
  };

  const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setError("❌ Invalid email format.");
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError("❌ Phone number must be 10 digits.");
      return;
    }

    if (!isValidMessage(formData.message)) {
      setError("❌ Message must not exceed 300 words.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/contact`, formData);

      if (response.status === 201) {
        setStatus({
          type: "success",
          message: "✅ Message sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({ type: "error", message: "❌ Failed to send message." });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "⚠️ An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 4000);
    }
  };

  return (
    <div className="animated-bg-wrapper">
      <section id="contact" className="w-100 bg-transparent position-relative">
        <div className="container-fluid px-0">
          <div className="row g-0 min-vh-100 align-items-center">
            {/* Left Info Block */}
            <div className="col-lg-6 p-5 text-dark">
              <h1 className="display-5 fw-bold lh-1 mb-3">Let’s Connect!</h1>
              <p className="fs-5 text-secondary">
                Reach out for project collaborations, technical support, or just
                to say hi. We're here to listen.
              </p>

              <ul className="list-unstyled mt-4 text-muted fs-6">
                <li>
                  📧 <strong>Email:</strong> techivanta@gmail.com
                </li>
                <li>
                  📞 <strong>Phone:</strong> +91 89860 49042
                </li>
                <li>
                  🏢 <strong>Address:</strong> 2nd Floor, Tech Park, Main Road,
                  Gopalganj, Bihar – 841428, India
                </li>
                <li>
                  🌐 <strong>Website:</strong> www.techivanta.com
                </li>
              </ul>

              <p className="mt-4 text-muted small">
                <em>We typically respond within 24 hours.</em>
              </p>
            </div>

            {/* Right Form Block */}
            <div className="col-lg-6 p-5 bg-white border-start shadow-sm">
              <form
                onSubmit={handleSubmit}
                className="p-4 border rounded-3 bg-white shadow-sm"
              >
                {status.message && (
                  <div
                    className={`alert alert-${
                      status.type === "success" ? "success" : "danger"
                    } mb-4`}
                  >
                    {status.message}
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="nameInput">Name *</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="emailInput">Email Address *</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneInput"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="phoneInput">Phone Number</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="subjectInput"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <label htmlFor="subjectInput">Subject</label>
                </div>

                <div className="form-floating mb-1">
                  <textarea
                    className={`form-control ${
                      !isValidMessage(formData.message) ? "is-invalid" : ""
                    }`}
                    id="messageInput"
                    name="message"
                    placeholder="Your message"
                    style={{ height: "160px" }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="messageInput">Message *</label>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <small className="text-muted">
                    Words used: {wordCount} / 300
                  </small>
                  {!isValidMessage(formData.message) && (
                    <small className="text-danger">
                      ❌ Max 300 words allowed
                    </small>
                  )}
                </div>

                <button
                  disabled={loading || !isValidMessage(formData.message)}
                  className="w-100 btn btn-lg btn-primary"
                  type="submit"
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
