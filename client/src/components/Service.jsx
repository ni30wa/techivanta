import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceList.css"; // optional custom styles

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
        const res = await axios.get("/api/services");
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/customers", formData);
      alert("Submitted successfully!");
      closePopup();
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
  };

  const getCardClass = (title) => {
    return title.toLowerCase().includes("enterprise")
      ? "service-card enterprise"
      : "service-card";
  };

  return (
    <section id="service" className="text-center mx-4">
      <div className="py-5 text-center animate-fade-in">
        <h1 className="display-5 fw-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Our Services
        </h1>
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
                  className="btn border border-gray-200 text-gray-200 bg-transparent"
                  onClick={() => openPopup(service)}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Custom Popup */}
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
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobileNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="WhatsApp Number"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsappNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={formData.plan}
                  disabled
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success">
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
