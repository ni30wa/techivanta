import { useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_SERVER_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const isValidMessage = (message) => {
    const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
    return wordCount <= 300;
  };

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
      setError("❌ Enter a valid 10-digit phone number.");
      return;
    }

    if (!isValidMessage(formData.message)) {
      setError("❌ Message must be 300 words or less.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/contact`, formData);
      if (response.status === 201) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      setStatus("❌ An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;

  return (
    <section
      id="contact"
      className="w-100 bg-light"
      style={{
        margin: 0,
        padding: 0,
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
      }}
    >
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100 align-items-center">
          {/* Left Block */}
          <div className="col-lg-7 p-5 text-dark">
            <h1 className="display-4 fw-bold lh-1 mb-3">Let’s Get In Touch!</h1>
            <p className="fs-5 text-secondary">
              Whether you’re curious about our services, need support, or want
              to explore a collaboration—feel free to contact us anytime.
            </p>
            <ul className="list-unstyled mt-4 text-muted fs-6">
              <li>📧 techivanta@gmail.com</li>
              <li>📞 +91 89860 49042</li>
              <li>
                🏢 2nd Floor, Tech Park, Main Road, Gopalganj, Bihar – 841428,
                India
              </li>
            </ul>
          </div>

          {/* Right Form Block */}
          <div className="col-lg-5 p-5 bg-white border-start shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded-3 bg-white shadow-sm"
            >
              {error && <p className="text-danger">{error}</p>}
              {status && <p className="text-success">{status}</p>}

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
                <label htmlFor="nameInput">Name</label>
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
                <label htmlFor="emailInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  id="phoneInput"
                  name="phone"
                  placeholder="Mob. No"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
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
                  style={{ height: "150px" }}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="messageInput">Message (Max 300 words)</label>
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
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" />
                ) : null}
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
