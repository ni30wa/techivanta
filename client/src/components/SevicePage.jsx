import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceList.css"; // Custom styling

const baseURL = import.meta.env.VITE_SERVER_URL;

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
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
        const res = await axios.get(`/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  const openPopup = (service) => {
    setSelectedService(service);
    setFormData((prev) => ({ ...prev, plan: service.title }));
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/customers`, formData);
      alert("Thank you! Your request has been submitted.");
      closePopup();
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="services" className="service-list-section py-5 px-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5 text-gradient">Our Services</h2>
        <p className="text-muted fs-5">
          Discover premium digital solutions tailored to accelerate your
          business.
        </p>
      </div>

      <div className="row justify-content-center gy-4">
        {services.length === 0 ? (
          <p className="text-center text-muted">
            No services available at the moment.
          </p>
        ) : (
          services.map((service) => (
            <div key={service._id} className="col-md-6 col-lg-4">
              <div
                className={`card service-card shadow-sm h-100 position-relative`}
              >
                {service.title.toLowerCase().includes("enterprise") && (
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                    Best Seller
                  </span>
                )}

                {service.icon && (
                  <div className="text-center mt-4">
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      className="service-icon"
                    />
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-center text-primary">
                    {service.title}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    ₹ {service.price}
                  </h6>
                  <p className="card-text text-center text-secondary small">
                    {service.description}
                  </p>

                  <ul className="list-unstyled text-start small mt-3">
                    {service.features.map((f, i) => (
                      <li key={i}>✅ {f}</li>
                    ))}
                  </ul>

                  <div className="mt-auto text-center">
                    <button
                      className="btn btn-outline-primary mt-3"
                      onClick={() => openPopup(service)}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- Popup Form --- */}
      {showPopup && selectedService && (
        <div className="popup-backdrop">
          <div className="popup-form">
            <div className="text-end">
              <button className="btn-close" onClick={closePopup}></button>
            </div>
            <h4 className="text-center text-primary fw-bold mb-3">
              Apply for {selectedService.title}
            </h4>

            <form onSubmit={handleFormSubmit}>
              {[
                { label: "Full Name", key: "fullName", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Mobile Number", key: "mobileNumber", type: "text" },
                {
                  label: "WhatsApp Number",
                  key: "whatsappNumber",
                  type: "text",
                },
              ].map((field) => (
                <div key={field.key} className="mb-3">
                  <input
                    type={field.type}
                    className="form-control"
                    placeholder={field.label}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={formData.plan}
                  disabled
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success w-100">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceList;
