import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

const AdminApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`/api/applicants`);
        setApplicants(res.data);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="main-content">
      <div className="container py-4">
        <h2 className="text-primary mb-4">All Applicants</h2>
        {loading ? (
          <p>Loading applicants...</p>
        ) : applicants.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>GitHub</th>
                  <th>LinkedIn</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Applied Date</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.mobile}</td>
                    <td>
                      {app.github ? (
                        <a href={app.github} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {app.linkedin ? (
                        <a href={app.linkedin} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{app.jobTitle || "-"}</td>
                    <td>{app.jobLocation || "-"}</td>
                    <td>{app.jobExperience || "-"}</td>
                    <td>
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td>
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Download
                        </a>
                      ) : (
                        "Not uploaded"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplicants;
