import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";

const Navbar = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");

    const listener = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const isDark = theme === "dark";

  // Collapse mobile navbar after click
  const collapseNavbar = () => {
    const nav = document.getElementById("navbarSupportedContent");
    if (nav && window.bootstrap) {
      const bsCollapse = new window.bootstrap.Collapse(nav, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top shadow-sm w-100 ${
        isDark ? "bg-dark navbar-dark" : "bg-white navbar-light"
      }`}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
    >
      <div className="w-100 px-3 px-lg-5 d-flex align-items-center justify-content-between flex-wrap">
        {/* Logo */}
        <a
          className="navbar-brand fw-bold d-flex align-items-center gap-2 m-0"
          href="#"
          onClick={collapseNavbar}
        >
          <img
            src={logo}
            alt="TechStep Logo"
            width="40"
            height="40"
            className="rounded-circle object-fit-cover shadow-sm"
          />
          Techivanta
        </a>

        {/* Toggler */}
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

        {/* Nav Links */}
        <div
          className="collapse navbar-collapse mt-3 mt-lg-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
            {[
              { name: "Home", href: "#" },
              { name: "About Us", href: "#about" },
              { name: "Service", href: "#service" },
              { name: "Projects", href: "#projects" },
              { name: "Blog", href: "#blog" },
              { name: "Careers", href: "#careers" },
              { name: "Contact", href: "#contact" },
            ].map((item, index, array) => (
              <li
                className={`nav-item px-1 ${
                  index === array.length - 1 ? "me-0" : ""
                }`}
                key={index}
              >
                <a
                  className="nav-link position-relative"
                  href={item.href}
                  style={{ transition: "color 0.3s" }}
                  onClick={collapseNavbar}
                >
                  {item.name}
                  <span
                    className="position-absolute start-0 bottom-0 w-100"
                    style={{
                      height: "2px",
                      backgroundColor: isDark ? "#ffffff99" : "#00000099",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s",
                    }}
                  ></span>
                </a>
              </li>
            ))}

            {user && user.email && (
              <li className="nav-item px-1">
                <Link
                  className="nav-link"
                  to="/admin/dashboard"
                  onClick={collapseNavbar}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Hover underline animation */}
      <style>
        {`
          .nav-link:hover span {
            transform: scaleX(1) !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
