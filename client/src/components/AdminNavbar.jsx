import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const AdminNavbar = () => {
  const { logout } = useAuth();

  // Collapse navbar on link click (mobile view)
  const collapseNavbar = () => {
    const nav = document.getElementById("navbarSupportedContent");
    if (nav && window.bootstrap) {
      const bsCollapse = new window.bootstrap.Collapse(nav, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  // Ensure Bootstrap JS is available
  useEffect(() => {
    if (!window.bootstrap) {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="#">
          Techvanta
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/admin/dashboard"
                onClick={collapseNavbar}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/messages"
                onClick={collapseNavbar}
              >
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/projects"
                onClick={collapseNavbar}
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/projects/add"
                onClick={collapseNavbar}
              >
                Add Project
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/blogs"
                onClick={collapseNavbar}
              >
                Add Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/customer"
                onClick={collapseNavbar}
              >
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/job"
                onClick={collapseNavbar}
              >
                Internship/Job
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/service"
                onClick={collapseNavbar}
              >
                Service
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/career"
                onClick={collapseNavbar}
              >
                Careers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/partner"
                onClick={collapseNavbar}
              >
                Official Partner
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/employee"
                onClick={collapseNavbar}
              >
                Employees Details
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/journey"
                onClick={collapseNavbar}
              >
                Our Journey
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/certificate"
                onClick={collapseNavbar}
              >
                Add Certificates
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard/gallery"
                onClick={collapseNavbar}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-2" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
