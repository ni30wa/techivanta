import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProjects.css";

const AdminProjects = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem("token");
    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
    };

    try {
      if (editProjectId) {
        await axios.put(`/api/projects/${editProjectId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus("Project updated successfully!");
        setShowEditModal(false);
        setEditProjectId(null);
      } else {
        await axios.post("/api/projects", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus("Project added successfully!");
      }

      setFormData({
        title: "",
        description: "",
        technologies: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: "",
      });
      fetchProjects();
    } catch (error) {
      console.error(error);
      setStatus("Failed to save project.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    });
    setEditProjectId(project._id);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setEditProjectId(null);
    setFormData({
      title: "",
      description: "",
      technologies: "",
      imageUrl: "",
      liveUrl: "",
      githubUrl: "",
    });
  };

  return (
    <div className="main-content">
      <div className="container py-5">
        <h2 className="mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="form-box mb-5">
          <div className="row g-3">
            {[
              "title",
              "description",
              "technologies",
              "imageUrl",
              "liveUrl",
              "githubUrl",
            ].map((field, i) => (
              <div className="col-md-6" key={i}>
                <label className="form-label text-capitalize">
                  {field.replace(/Url/, " URL")}
                </label>
                {field === "description" ? (
                  <textarea
                    className="form-control"
                    name={field}
                    rows="3"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "technologies" ? "e.g. React, Node.js" : ""
                    }
                    required={field === "title" || field === "description"}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={submitting}
          >
            {submitting
              ? editProjectId
                ? "Updating..."
                : "Adding..."
              : editProjectId
              ? "Update Project"
              : "Add Project"}
          </button>
          {status && (
            <div
              className={`mt-3 ${
                status.includes("success") ? "text-success" : "text-danger"
              }`}
            >
              {status}
            </div>
          )}
        </form>

        <h2 className="mb-4">All Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="row g-4">
            {projects.map((project, i) => (
              <div className="col-sm-6 col-lg-4" key={project._id}>
                <div
                  className="project-card animate-fadein"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      className="card-img-top"
                      alt={project.title}
                      style={{ height: "160px" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <p>
                      <strong>Tech:</strong> {project.technologies?.join(", ")}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between flex-wrap gap-2">
                    <div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-success me-2"
                        >
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-dark"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(project._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔧 Modal for Editing Project */}
        {showEditModal && (
          <div className="edit-modal">
            <div className="modal-content">
              <h4>Edit Project</h4>
              <form onSubmit={handleSubmit}>
                {[
                  "title",
                  "description",
                  "technologies",
                  "imageUrl",
                  "liveUrl",
                  "githubUrl",
                ].map((field, i) => (
                  <div className="mb-3" key={i}>
                    <label className="form-label text-capitalize">
                      {field.replace(/Url/, " URL")}
                    </label>
                    {field === "description" ? (
                      <textarea
                        className="form-control"
                        name={field}
                        rows="3"
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required={field === "title" || field === "description"}
                      />
                    )}
                  </div>
                ))}
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={submitting}
                  >
                    {submitting ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
