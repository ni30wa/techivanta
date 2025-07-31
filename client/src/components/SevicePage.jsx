import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import successAnimation from "./success.json"; // Ensure this file exists
import "./ServiceList.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successStage, setSuccessStage] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    plan: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  const openPopup = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, plan: service.title });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedService(null);
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      whatsappNumber: "",
      plan: "",
    });
  };

  const validateForm = () => {
    const { fullName, email, mobileNumber, whatsappNumber } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (fullName.trim().length < 3)
      return "Name must be at least 3 characters.";
    if (!emailRegex.test(email)) return "Enter a valid email.";
    if (!mobileRegex.test(mobileNumber))
      return "Mobile number must be 10 digits.";
    if (!mobileRegex.test(whatsappNumber))
      return "WhatsApp number must be 10 digits.";
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return alert(error);

    setIsSubmitting(true);
    try {
      await axios.post(`${baseURL}/api/customers`, formData);
      setIsSubmitting(false);
      closePopup();
      setSuccessStage(1);
      setTimeout(() => {
        setSuccessStage(2);
        setTimeout(() => setSuccessStage(0), 2000);
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
      alert("Submission failed!");
    }
  };

  const getCardClass = (title) =>
    title.toLowerCase().includes("enterprise")
      ? "service-card enterprise"
      : "service-card";

  return (
    <section id="service" className="text-center mx-4">
      <div className="py-5 text-center animate-fade-in">
        <h1 className="display-5 fw-bold gradient-text">Our Services</h1>
        <p className="lead text-secondary mt-3">
          Explore the solutions we offer to{" "}
          <span className="fw-semibold text-dark">
            empower your business growth
          </span>
          .
        </p>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-4">
        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          services.map((service) => (
            <div key={service._id} className={getCardClass(service.title)}>
              {service.title.toLowerCase().includes("enterprise") && (
                <div className="ribbon">Best</div>
              )}
              {service.icon && (
                <img src={service.icon} alt="icon" className="icon-img mb-2" />
              )}
              <h5 className="text-uppercase fw-bold mb-2">{service.title}</h5>
              <h6 className="price fw-semibold mb-2">₹ {service.price}</h6>
              <p className="px-3 small text-muted">{service.description}</p>
              <ul className="list-unstyled small text-start px-3 flex-grow-1">
                {service.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
              <div className="text-center my-3">
                <button
                  className="btn border text-gray-200 bg-transparent"
                  onClick={() => openPopup(service)}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-5 text-center company-details animate-fade-in">
        <h4 className="fw-bold mb-2">About Techivanta Pvt. Ltd.</h4>
        <p className="text-muted mb-1">
          Techivanta Pvt. Ltd. is a trusted software company delivering top-tier
          web and mobile solutions, empowering businesses with cutting-edge
          technology.
        </p>
        <p className="text-muted mb-1">
          Registered under MCA (Ministry of Corporate Affairs) –{" "}
          <strong>Reg. No. 0034726</strong>
        </p>
        <p className="text-muted mb-1">
          Email: <a href="mailto:techivanta@gmail.com">techivanta@gmail.com</a>{" "}
          | Phone: +91-89860 049042
        </p>
        <p className="text-muted">
          Address: 2nd Floor, Tech Park, Main Road, Gopalganj, Bihar – 841428,
          India
        </p>
      </div>

      {showPopup && selectedService && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="text-end">
              <button className="btn btn-sm btn-danger" onClick={closePopup}>
                ✖
              </button>
            </div>
            <h4 className="text-center text-indigo-700 mb-3">
              Apply for {selectedService.title}
            </h4>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mobile Number"
                required
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="WhatsApp Number"
                required
                value={formData.whatsappNumber}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappNumber: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-3"
                disabled
                value={formData.plan}
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(successStage === 1 || successStage === 2) && (
        <div className="popup-overlay">
          <div className="success-popup text-center">
            {successStage === 1 && (
              <>
                <Lottie
                  animationData={successAnimation}
                  loop={false}
                  style={{ height: 120 }}
                />
                <h5 className="text-success mt-2">
                  Your request has been submitted.
                </h5>
              </>
            )}
            {successStage === 2 && (
              <p className="text-muted">Our team will contact you shortly.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceList;
