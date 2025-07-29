import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminEmployeeForm.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const defaultForm = {
  fullName: "",
  position: "",
  department: "",
  email: "",
  phone: "",
  joinDate: "",
  resignDate: "",
  address: "",
  status: "active",
};

const EmployeeManager = () => {
  const [formData, setFormData] = useState(defaultForm);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`/api/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`/api/employees/${id}`);
      setFormData({
        ...res.data,
        joinDate: res.data.joinDate?.substring(0, 10) || "",
        resignDate: res.data.resignDate?.substring(0, 10) || "",
      });
      setEditId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setMessage("Failed to load employee");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/api/employees/${id}`, { status });
      fetchEmployees();
    } catch {
      setMessage("Failed to update status");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editId) {
        await axios.put(`/api/employees/${editId}`, formData);
        setMessage("Employee updated successfully!");
      } else {
        await axios.post(`/api/employees`, formData);
        setMessage("Employee added successfully!");
      }
      setFormData(defaultForm);
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="employee-manager">
        <h2>{editId ? "Edit Employee" : "Add New Employee"}</h2>

        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Mobile App Developer">Mobile App Developer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Cybersecurity Analyst">
                Cybersecurity Analyst
              </option>
              <option value="QA Engineer">QA Engineer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Project Manager">Project Manager</option>
              <option value="IT Consultant">IT Consultant</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Sales Executive">Sales Executive</option>
              <option value="Marketing Executive">Marketing Executive</option>
              <option value="Finance Executive">Finance Executive</option>
              <option value="Support Engineer">Support Engineer</option>
              <option value="System Administrator">System Administrator</option>
            </select>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Software Development">Software Development</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="DevOps">DevOps</option>
              <option value="IT Support">IT Support</option>
              <option value="Consulting Services">Consulting Services</option>
              <option value="Project Management">Project Management</option>
              <option value="QA & Testing">QA & Testing</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              name="joinDate"
              placeholder="Join Date"
              value={formData.joinDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="resignDate"
              placeholder="Resign Date"
              value={formData.resignDate}
              onChange={handleChange}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="resigned">Resigned</option>
            </select>
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : editId ? "Update" : "Add Employee"}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>

        <h2 className="section-title">Employee List</h2>
        <div className="card-grid">
          {employees.map((emp) => (
            <div key={emp._id} className="employee-card">
              <h3>{emp.fullName}</h3>
              <p>
                <strong>Position:</strong> {emp.position}
              </p>
              <p>
                <strong>Email:</strong> {emp.email}
              </p>
              <p>
                <strong>Join Date:</strong> {emp.joinDate?.substring(0, 10)}
              </p>
              <p>
                <strong>Resign Date:</strong>{" "}
                {emp.resignDate?.substring(0, 10) || "—"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`badge ${emp.status}`}>{emp.status}</span>
              </p>
              <div className="actions">
                <button
                  onClick={() => handleEdit(emp._id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <select
                  value={emp.status}
                  onChange={(e) => handleStatusChange(emp._id, e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="resigned">Resigned</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManager;
