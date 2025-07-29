import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminCareers.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const AdminJobForm = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Internship",
    jobDescription: "",
    experienceLevel: "Fresher",
    eligibility: "",
    skills: "",
    applicationDeadline: "",
    resumeRequired: true,
  });

  const fetchJobs = async () => {
    const res = await axios.get(`/api/jobs`);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };
    await axios.post(`/api/jobs`, data);
    fetchJobs();
    setFormData({
      title: "",
      location: "",
      type: "Internship",
      jobDescription: "",
      experienceLevel: "Fresher",
      eligibility: "",
      skills: "",
      applicationDeadline: "",
      resumeRequired: true,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className="main-content">
      <div className="admin-careers-container">
        <div className="form-section">
          <h2 className="form-title">Post a New Job</h2>
          <form onSubmit={handleSubmit} className="job-form">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <select name="type" value={formData.type} onChange={handleChange}>
              <option>Internship</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
            </select>
            <textarea
              name="jobDescription"
              placeholder="Job Description"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
            >
              <option>Fresher</option>
              <option>0-1 years</option>
              <option>1-3 years</option>
              <option>3+ years</option>
            </select>
            <input
              type="text"
              name="eligibility"
              placeholder="Eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
            />
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              required
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="resumeRequired"
                checked={formData.resumeRequired}
                onChange={handleChange}
              />
              Resume Required
            </label>
            <button type="submit" className="submit-btn">
              Post Job
            </button>
          </form>
        </div>

        <div className="jobs-section">
          <h3 className="jobs-title">All Jobs</h3>
          <div className="jobs-scrollable">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-card-header">
                  <h4>{job.title}</h4>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
                <div className="job-details">
                  {job.type} | {job.location}
                </div>
                <p className="job-desc">{job.jobDescription}</p>
                <div className="job-meta">
                  <p>
                    <strong>Experience:</strong> {job.experienceLevel}
                  </p>
                  <p>
                    <strong>Eligibility:</strong> {job.eligibility}
                  </p>
                  <p>
                    <strong>Skills:</strong> {job.skills.join(", ")}
                  </p>
                  <p>
                    <strong>Apply before:</strong>{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Resume Required:</strong>{" "}
                    {job.resumeRequired ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobForm;
