import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDocuments.css";

const AdminDocuments = () => {
  const [type, setType] = useState("offerletter");
  const [dataList, setDataList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    studentName: "",
    email: "",
    gender: "Male",
    college: "",
    mobileNumber: "",
    position: "",
    duration: "",
    issueDate: "",
    startDate: "",
    endDate: "",
    studentType: "Internship",
    paidStatus: "Unpaid",
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/${type}`);
      setDataList(res.data.reverse());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    setFormData(initialFormData);
    setEditingId(null);
  }, [type]);

  const generateId = () => {
    const prefix = type === "certificate" ? "CT" : "OL";
    return `${prefix}${Date.now()}`;
  };

  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration) return "";
    const date = new Date(startDate);
    const [value, unit] = duration.toLowerCase().split(" ");
    const amount = parseInt(value);
    if (isNaN(amount)) return "";

    if (unit.startsWith("month")) {
      date.setMonth(date.getMonth() + amount);
    } else if (unit.startsWith("week")) {
      date.setDate(date.getDate() + amount * 7);
    } else if (unit.startsWith("day")) {
      date.setDate(date.getDate() + amount);
    }

    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    if (type === "certificate" && formData.startDate && formData.duration) {
      const endDate = calculateEndDate(formData.startDate, formData.duration);
      setFormData((prev) => ({ ...prev, endDate }));
    }
  }, [formData.startDate, formData.duration, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload =
      type === "certificate"
        ? {
            certificateId: editingId ? undefined : generateId(),
            studentName: formData.studentName,
            email: formData.email,
            gender: formData.gender,
            college: formData.college,
            mobileNumber: formData.mobileNumber,
            certificateType: formData.studentType,
            position: formData.position,
            duration: formData.duration,
            startDate: formData.startDate,
            endDate: formData.endDate,
            issuedDate: formData.issueDate,
          }
        : {
            offerLetterId: editingId ? undefined : generateId(),
            name: formData.studentName,
            email: formData.email,
            gender: formData.gender,
            college: formData.college,
            mobileNumber: formData.mobileNumber,
            offerPosition: formData.position,
            studentType: formData.studentType,
            duration: formData.duration,
            paidStatus: formData.paidStatus,
            offerDate: formData.issueDate,
          };

    try {
      if (editingId) {
        await axios.put(`/api/${type}/${editingId}`, payload);
      } else {
        await axios.post(`/api/${type}`, payload);
      }
      fetchData();
      setFormData(initialFormData);
      setEditingId(null);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    if (type === "certificate") {
      setFormData({
        studentName: item.studentName || "",
        email: item.email || "",
        gender: item.gender || "Male",
        college: item.college || "",
        mobileNumber: item.mobileNumber || "",
        studentType: item.certificateType || "Internship",
        position: item.position || "",
        duration: item.duration || "",
        startDate: item.startDate?.slice(0, 10) || "",
        endDate: item.endDate?.slice(0, 10) || "",
        issueDate: item.issuedDate?.slice(0, 10) || "",
        paidStatus: "Unpaid",
      });
    } else {
      setFormData({
        studentName: item.name || "",
        email: item.email || "",
        gender: item.gender || "Male",
        college: item.college || "",
        mobileNumber: item.mobileNumber || "",
        studentType: item.studentType || "Internship",
        paidStatus: item.paidStatus || "Unpaid",
        position: item.offerPosition || "",
        duration: item.duration || "",
        issueDate: item.offerDate?.slice(0, 10) || "",
      });
    }
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await axios.delete(`/api/${type}/${id}`);
        fetchData();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="main-content">
      <div className="admin-docs-container">
        <h2>
          📑 Manage {type === "offerletter" ? "Offer Letters" : "Certificates"}
        </h2>

        <div className="doc-toggle">
          <button
            className={type === "offerletter" ? "active" : ""}
            onClick={() => setType("offerletter")}
          >
            Offer Letters
          </button>
          <button
            className={type === "certificate" ? "active" : ""}
            onClick={() => setType("certificate")}
          >
            Certificates
          </button>
        </div>

        <form className="doc-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={(e) =>
              setFormData({ ...formData, studentName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            placeholder="College"
            value={formData.college}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Position / Course"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration (e.g., 3 months)"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />

          {type === "certificate" && (
            <>
              <label>Start Date:</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
              <label>End Date (auto-calculated):</label>
              <input type="date" value={formData.endDate} disabled />
            </>
          )}

          {type === "offerletter" && (
            <>
              <select
                value={formData.studentType}
                onChange={(e) =>
                  setFormData({ ...formData, studentType: e.target.value })
                }
              >
                <option value="Internship">Internship</option>
                <option value="Training">Training</option>
                <option value="Full-Time">Full-Time</option>
              </select>

              {formData.studentType === "Internship" && (
                <select
                  value={formData.paidStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, paidStatus: e.target.value })
                  }
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>
              )}
            </>
          )}

          <label>{type === "certificate" ? "Issue Date" : "Offer Date"}:</label>
          <input
            type="date"
            value={formData.issueDate}
            onChange={(e) =>
              setFormData({ ...formData, issueDate: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update" : "Add"}{" "}
            {type === "offerletter" ? "Offer Letter" : "Certificate"}
          </button>
        </form>

        <div className="doc-list">
          {dataList.map((item) => (
            <div className="doc-card" key={item._id}>
              <h4>{type === "offerletter" ? item.name : item.studentName}</h4>
              <p>
                <strong>Position:</strong>{" "}
                {type === "offerletter" ? item.offerPosition : item.position}
              </p>
              <p>
                <strong>Duration:</strong> {item.duration}
              </p>
              {type === "certificate" && (
                <>
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(item.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(item.endDate).toLocaleDateString()}
                  </p>
                </>
              )}
              <p>
                <strong>
                  {type === "offerletter" ? "Offer" : "Issue"} Date:
                </strong>{" "}
                {new Date(
                  type === "offerletter" ? item.offerDate : item.issuedDate
                ).toLocaleDateString()}
              </p>
              <div className="doc-actions">
                <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button onClick={() => handleDelete(item._id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
