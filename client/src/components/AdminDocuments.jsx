import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDocuments.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

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
    reasonForLeaving: "",
    fromDate: "",
    toDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formData, setFormData] = useState(initialFormData);

useEffect(() => {
  const { startDate, duration } = formData;

  if (!startDate || !duration) return;

  const match = duration.match(/(\d+)\s*(week|weeks|month|months)/i);
  if (!match) return;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  const start = new Date(startDate);
  let end = new Date(start);

  if (unit.includes("week")) {
    end.setDate(start.getDate() + value * 7);
  } else if (unit.includes("month")) {
    end.setMonth(start.getMonth() + value);
  }

  const formattedEndDate = end.toISOString().split("T")[0];

  if (formData.endDate !== formattedEndDate) {
    setFormData((prev) => ({ ...prev, endDate: formattedEndDate }));
  }
}, [formData.startDate, formData.duration]);


  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/${type}`);
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
    if (type === "certificate") return `CT${Date.now()}`;
    if (type === "excertificates") return `EX${Date.now()}`;
    return `OL${Date.now()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let payload = {};
    if (type === "certificate") {
      payload = {
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
      };
    } else if (type === "excertificates") {
      payload = {
        experienceLetterId: editingId ? undefined : generateId(),
        employeeName: formData.studentName,
        email: formData.email,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        position: formData.position,
        department: formData.college,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reasonForLeaving: formData.reasonForLeaving,
      };
    } else {
      payload = {
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
    }

    try {
      if (editingId) {
        await axios.put(`${baseURL}/api/${type}/${editingId}`, payload);
      } else {
        await axios.post(`${baseURL}/api/${type}`, payload);
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
    } else if (type === "excertificates") {
      setFormData({
        studentName: item.employeeName || "",
        email: item.email || "",
        gender: item.gender || "Male",
        mobileNumber: item.mobileNumber || "",
        position: item.position || "",
        college: item.department || "",
        fromDate: item.fromDate?.slice(0, 10) || "",
        toDate: item.toDate?.slice(0, 10) || "",
        reasonForLeaving: item.reasonForLeaving || "",
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
        await axios.delete(`${baseURL}/api/${type}/${id}`);
        fetchData();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="main-content">
      <div className="admin-docs-container">
        <h2>📑 Manage {type}</h2>

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
          <button
            className={type === "excertificates" ? "active" : ""}
            onClick={() => setType("excertificates")}
          >
            Experience Letters
          </button>
        </div>

        <form className="doc-form" onSubmit={handleSubmit}>
          {/* Shared Fields */}
          <input
            type="text"
            placeholder="Name"
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
            placeholder={type === "excertificates" ? "Department" : "College"}
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

          {/* Conditional Fields */}
          {type === "excertificates" ? (
            <>
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="From Date"
                value={formData.fromDate}
                onChange={(e) =>
                  setFormData({ ...formData, fromDate: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="To Date"
                value={formData.toDate}
                onChange={(e) =>
                  setFormData({ ...formData, toDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Reason for Leaving"
                value={formData.reasonForLeaving}
                onChange={(e) =>
                  setFormData({ ...formData, reasonForLeaving: e.target.value })
                }
              />
            </>
          ) : (
            <>
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
                  <label>End Date:</label>
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
              <label>
                {type === "certificate" ? "Issue Date" : "Offer Date"}:
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
              />
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update" : "Add"}{" "}
            {type.replace(/letter$/, " Letter")}
          </button>
        </form>

        <div className="doc-list">
          {dataList.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              ❌ No data found for{" "}
              {type === "offerletter"
                ? "Offer Letters"
                : type === "certificate"
                ? "Certificates"
                : "Experience Letters"}
            </p>
          ) : (
            dataList.map((item) => (
              <div className="doc-card" key={item._id}>
                <h4>
                  {type === "offerletter"
                    ? item.name
                    : type === "certificate"
                    ? item.studentName
                    : item.employeeName}
                </h4>

                <p>
                  <strong>Position:</strong>{" "}
                  {item.position || item.offerPosition || item.position}
                </p>

                {type === "certificate" && (
                  <>
                    <p>
                      <strong>Duration:</strong> {item.duration || "N/A"}
                    </p>
                    <p>
                      <strong>Start:</strong>{" "}
                      {item.startDate
                        ? new Date(item.startDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>End:</strong>{" "}
                      {item.endDate
                        ? new Date(item.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </>
                )}

                {type === "excertificates" && (
                  <>
                    <p>
                      <strong>Department:</strong> {item.department || "N/A"}
                    </p>
                    <p>
                      <strong>From:</strong>{" "}
                      {item.fromDate
                        ? new Date(item.fromDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>To:</strong>{" "}
                      {item.toDate
                        ? new Date(item.toDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Reason For Leaving:</strong>{" "}
                      {item.reasonForLeaving || "N/A"}
                    </p>
                    <p>
                      <strong>Issued Date:</strong>{" "}
                      {item.issuedDate
                        ? new Date(item.issuedDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </>
                )}

                {type === "offerletter" && (
                  <p>
                    <strong>Offer Date:</strong>{" "}
                    {item.offerDate
                      ? new Date(item.offerDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}

                <div className="doc-actions">
                  <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(item._id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
