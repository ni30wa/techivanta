import { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";
const baseURL = import.meta.env.VITE_SERVER_URL;

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="text-center mx-4" id="projects">
      <div className="py-5 text-center">
        <h1 className="fw-bold display-5 text-primary mb-3 animate-fadein">
          🚀 Our Projects
        </h1>
        <p className="lead text-muted fs-5 animate-fadein-slow">
          Discover some of the global solutions we’ve proudly delivered.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-center">No projects found.</p>
      ) : (
        <div
          className="d-flex overflow-auto gap-4 pb-4 px-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="project-container">
            {projects.map((project) => (
              <div
                key={project._id}
                className="card shadow-sm project-card"
                style={{
                  minWidth: "300px",
                  maxWidth: "320px",
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  background: "#f8f9ff",
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-indigo-700 fw-semibold mb-2">
                    {project.title}
                  </h5>

                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt="project"
                      className="img-fluid rounded mb-3"
                      style={{ height: "80px", objectFit: "contain" }}
                    />
                  ) : (
                    <div className="w-100 text-center text-muted mb-3">
                      No Image
                    </div>
                  )}

                  <p className="card-text small text-muted mb-2">
                    {project.description?.slice(0, 90)}...
                  </p>

                  <div className="mb-3 d-flex flex-wrap gap-1 justify-content-center">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="badge text-bg-secondary"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto d-flex justify-content-center gap-2 pt-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-dark"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
