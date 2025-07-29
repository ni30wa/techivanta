import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const baseURL = import.meta.env.VITE_SERVER_URL;

const AdminServiceManager = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    description: "",
    price: "",
    features: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch all services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`/api/services`); // full URL
      console.log("Fetched services:", res.data);
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setServices([]);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit new or updated service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/services/${editingId}`, formData);
      } else {
        await axios.post(`/api/services`, formData);
      }
      fetchServices();
      setFormData({
        title: "",
        icon: "",
        description: "",
        price: "",
        features: "",
        isActive: true,
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };

  // Edit service
  const handleEdit = (service) => {
    setFormData(service);
    setIsEditing(true);
    setEditingId(service._id);
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div className="main-content">
      <div className="container py-4">
        <h2 className="mb-4 text-center fw-bold">Admin Service Management</h2>

        {/* Service Form */}
        <form onSubmit={handleSubmit} className="row g-3 mb-5">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Service Title"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="url"
              className="form-control"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Icon URL (optional)"
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="2"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Features (comma separated)"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-check-label me-3">
              <input
                type="checkbox"
                className="form-check-input me-1"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              Active
            </label>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              {isEditing ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>

        {/* Service Cards */}
        <div className="row">
          {services.length === 0 ? (
            <div className="text-muted text-center">No services found.</div>
          ) : (
            services.map((service) => (
              <div className="col-md-4 mb-4" key={service._id}>
                <div className="card h-100 shadow-sm">
                  {service.icon && (
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="card-img-top"
                      style={{ height: "160px", objectFit: "contain" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                    <p className="text-muted small mb-1">
                      Features: {service.features}
                    </p>
                    <p className="fw-bold">₹{service.price}</p>
                    <p className="badge bg-success">
                      {service.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(service)}
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(service._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceManager;
