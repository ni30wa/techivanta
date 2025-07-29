import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCertifications.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const AdminCertifications = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "certification",
    description: "",
    logoUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("certification");

  const fetchCerts = async () => {
    try {
      const res = await axios.get(`/api/partner`);
      setCerts(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/partner/${editId}`, form);
      } else {
        await axios.post(`/api/partner`, form);
      }
      setForm({
        name: "",
        type: "certification",
        description: "",
        logoUrl: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchCerts();
    } catch (err) {
      console.error("Submit error", err);
    }
  };

  const handleEdit = (cert) => {
    setForm(cert);
    setIsEditing(true);
    setEditId(cert._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`/api/partner/${id}`);
        fetchCerts();
      } catch (err) {
        console.error("Delete error", err);
      }
    }
  };

  const filteredList = certs.filter((item) => item.type === activeTab);

  return (
    <div className="main-content">
      <div id="partner" className="container py-4">
        <h2 className="mb-4 text-primary">Manage Certifications & Partners</h2>

        <form onSubmit={handleSubmit} className="row g-3 mb-5">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="certification">Certification</option>
              <option value="partner">Partner</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Logo URL</label>
            <input
              name="logoUrl"
              className="form-control"
              value={form.logoUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={form.description}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "certification" ? "active" : ""
              }`}
              onClick={() => setActiveTab("certification")}
            >
              Certifications
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "partner" ? "active" : ""}`}
              onClick={() => setActiveTab("partner")}
            >
              Partners
            </button>
          </li>
        </ul>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Description</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      style={{ width: "60px", height: "auto" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No {activeTab}s found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCertifications;
