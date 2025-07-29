import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CareerPage.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const Counter = ({ end, label, bg }) => {
  const [count, setCount] = useState(0);
  const duration = 1000;
  const steps = 40;
  const increment = parseInt(end) / steps;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= parseInt(end)) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [end]);

  return (
    <div className="col-6 col-md-3">
      <div
        className="p-3 rounded shadow-sm h-100"
        style={{ backgroundColor: bg }}
      >
        <h5 className="mb-1 fw-bold text-primary">{`${count}+`}</h5>
        <p className="mb-0 text-muted">{label}</p>
      </div>
    </div>
  );
};

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicantCount, setApplicantCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    github: "",
    linkedin: "",
    experience: "",
    location: "",
    resume: null,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/jobs`);
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    });
    setFilteredJobs(filtered);
  }, [searchTitle, searchLocation, jobs]);

  const openApplyForm = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
    setIsSubmitting(false);
    setIsSuccess(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      github: "",
      linkedin: "",
      experience: "",
      location: "",
      resume: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume || !selectedJob) return;

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("mobile", formData.mobile);
    payload.append("github", formData.github);
    payload.append("linkedin", formData.linkedin);
    payload.append("resumeUrl", formData.resume);
    payload.append("jobId", selectedJob._id);
    payload.append("title", selectedJob.title);
    payload.append("location", formData.location);
    payload.append("experience", formData.experience);

    setIsSubmitting(true);

    try {
      await axios.post(`${baseURL}/api/applicants`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        closePopup();
      }, 2000);
    } catch (error) {
      console.error("Failed to submit application:", error);
      alert("Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [applicantRes, employeeRes] = await Promise.all([
          axios.get("/api/applicants/count"),
          axios.get("/api/employees/count/total"),
        ]);

        setApplicantCount(applicantRes.data.count || 0);
        setEmployeeCount(employeeRes.data.total || 0);
      } catch (error) {
        console.error("Error fetching counter data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section
      className="py-5 text-dark"
      id="careers"
      style={{ background: "linear-gradient(to right, #f8fbff, #e6f0ff)" }}
    >
      <div className="mx-3">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-primary">
            Careers at Techivanta
          </h2>
          <p className="text-secondary">
            Be part of a passionate and driven team that’s building the digital
            future.
          </p>
        </div>

        {/* 🔢 Animated Counters */}
        <div className="container mb-5">
          <div className="row g-3">
            <Counter end={employeeCount} label="Total Employees" bg="#e0f7fa" />
            <Counter end="10" label="Open Positions" bg="#ede7f6" />
            <Counter
              end={applicantCount}
              label="Applicants Applied"
              bg="#fff3e0"
            />
            <Counter end="2" label="Global Offices" bg="#f3e5f5" />
          </div>
        </div>

        {/* 🔍 Search & Filter */}
        <div className="container mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by job title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 💼 Job Listings */}
        <div className="container">
          <div className="row g-4">
            {filteredJobs.length === 0 ? (
              <p className="text-center w-100">
                No job openings currently available.
              </p>
            ) : (
              filteredJobs.map((job, index) => (
                <div
                  key={job._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 animate-slideup"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white border border-2 border-primary-subtle rounded shadow-lg p-4 h-100">
                    <h5 className="fw-bold text-primary">{job.title}</h5>
                    <p className="text-muted mb-1">
                      🌍 Location: {job.location}
                    </p>
                    <p className="text-muted mb-1">Type: {job.type}</p>
                    <p className="text-muted mb-1">
                      Experience: {job.experienceLevel}
                    </p>
                    <p className="text-danger mb-1">
                      Last Date:{" "}
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                    <p className="text-muted mb-2">
                      Eligibility: {job.eligibility}
                    </p>
                    <ul className="text-secondary">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openApplyForm(job)}
                      className="btn btn-sm btn-gradient mt-3 w-100 text-white"
                      style={{
                        background:
                          "linear-gradient(to right, #007bff, #00c6ff)",
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 📝 Application Form Popup (unchanged) */}
        {showPopup && selectedJob && (
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
            <div
              className="bg-white p-4 rounded-4 shadow-lg"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <h5 className="mb-3 text-center fw-semibold text-primary">
                Apply for {selectedJob.title}
              </h5>

              {isSubmitting ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary mb-3"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  ></div>
                  <p>Submitting your application...</p>
                </div>
              ) : isSuccess ? (
                <div className="text-center py-5">
                  <div className="text-success display-3 mb-3">✔</div>
                  <h5 className="fw-bold">Application Submitted!</h5>
                  <p className="text-muted">Thank you for applying.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="mb-3">
                      <label className="form-label">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedJob.title || ""}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Name</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Mobile</label>
                      <input
                        name="mobile"
                        type="number"
                        className="form-control"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">LinkedIn</label>
                      <input
                        name="linkedin"
                        type="url"
                        className="form-control"
                        value={formData.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">GitHub</label>
                      <input
                        name="github"
                        type="url"
                        className="form-control"
                        value={formData.github}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Experience</label>
                      <select
                        name="experience"
                        className="form-select"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select --</option>
                        {selectedJob.experienceLevel
                          ?.split(",")
                          .map((exp, i) => (
                            <option key={i} value={exp.trim()}>
                              {exp.trim()}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <select
                        name="location"
                        className="form-select"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select --</option>
                        {selectedJob.location?.split(",").map((loc, i) => (
                          <option key={i} value={loc.trim()}>
                            {loc.trim()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Resume (PDF, JPG, PNG)
                      </label>
                      <input
                        name="resume"
                        type="file"
                        className="form-control"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 💬 Why Join Us Section */}
        <div className="container mt-5 pt-4">
          <h3 className="text-primary fw-bold mb-3 text-center">
            Why Join Techivanta?
          </h3>
          <p className="text-center text-muted mb-4">
            At Techivanta, we value innovation, inclusivity, and growth. Join us
            to work with visionary leaders, cutting-edge tech, and real impact.
          </p>
          <div className="row text-center text-muted">
            <div className="col-md-4 mb-4">
              <h5 className="fw-semibold text-dark">🚀 Career Growth</h5>
              <p>
                Opportunities for advancement and skill-building in every role.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-semibold text-dark">
                🤝 Collaborative Culture
              </h5>
              <p>We believe in teamwork, mentoring, and shared success.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="fw-semibold text-dark">🌐 Flexible Environment</h5>
              <p>
                Work from anywhere, on your terms, with supportive leadership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
