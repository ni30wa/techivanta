import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/contact", formData);

      if (response.status === 201) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("An error occurred.");
      console.log(error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

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
          {/* Left Text Block */}
          <div className="col-lg-7 p-5 text-dark">
            <h1 className="display-4 fw-bold lh-1 mb-3">Let’s Get In Touch!</h1>
            <p className="fs-5 text-secondary">
              Whether you’re curious about our services, need support, or want
              to explore a collaboration—feel free to contact us anytime.
            </p>
            <ul className="list-unstyled mt-4 text-muted fs-6">
              <li>📧 techivanta@gmail.com</li>
              <li>📞 +91 89860 49042</li>
              <li>🏢 Gopalganj, India</li>
            </ul>
          </div>

          {/* Right Form Block */}
          <div className="col-lg-5 p-5 bg-white border-start shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded-3 bg-white shadow-sm"
            >
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
                  type="number"
                  className="form-control"
                  id="phoneInput"
                  name="phone"
                  placeholder="Mob. No"
                  value={formData.phone}
                  onChange={handleChange}
                  required
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

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="messageInput"
                  name="message"
                  placeholder="Your message"
                  style={{ height: "150px" }}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="messageInput">Message</label>
              </div>
              <button
                disabled={loading}
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
