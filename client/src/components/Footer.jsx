import {
  LinkedinIcon,
  Facebook,
  Instagram,
  Twitter,
  Github,
  XIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-white text-dark shadow-lg pt-5 pb-4 mt-auto w-100 border-top">
      <div className="container-fluid px-4">
        <div className="row gy-4">
          {/* Company Overview */}
          <div className="col-md-3">
            <h5 className="text-uppercase fw-bold mb-3 text-primary">
              Techivanta Pvt. Ltd.
            </h5>
            <p className="text-muted">
              Techivanta is a leading IT solutions provider specializing in
              digital transformation, cloud services, and enterprise software.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="https://www.linkedin.com/company/techivanta"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover-icon"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://www.instagram.com/techivanta"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover-icon"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/techivanta"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover-icon"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/techivanta"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover-icon"
              >
                <XIcon size={20} />
              </a>
              <a
                href="https://github.com/Techivanta-Private-Limited"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover-icon"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3 text-primary">
              Company
            </h6>
            <ul className="list-unstyled">
              {["About Us", "Careers", "Blog", "Contact", "verify"].map(
                (item, i) => {
                  const path = item.toLowerCase().replace(/\s+/g, "");
                  return (
                    <li key={i}>
                      <NavLink
                        to={`/${path}`}
                        className={({ isActive }) =>
                          `text-decoration-none d-block py-1 hover-link ${
                            isActive ? "text-primary fw-semibold" : "text-muted"
                          }`
                        }
                      >
                        {item}
                      </NavLink>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3 text-primary">
              Quick Links
            </h6>
            <ul className="list-unstyled">
              {[
                { name: "Gallery", path: "gallery" },
                { name: "Privacy Policy", path: "privacy-policy" },
                { name: "Terms & Conditions", path: "terms" },
                { name: "Support", path: "support" },
                { name: "FAQs", path: "faqs" },
              ].map((link, i) => (
                <li key={i}>
                  <NavLink
                    to={`/${link.path}`}
                    className={({ isActive }) =>
                      `text-decoration-none d-block py-1 hover-link ${
                        isActive ? "text-primary fw-semibold" : "text-muted"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3 text-primary">
              Our Services
            </h6>
            <ul className="list-unstyled">
              {[
                { name: "Web Development", path: "web-development" },
                { name: "Cloud Solutions", path: "cloud-solutions" },
                { name: "Mobile App Development", path: "mobile-apps" },
                { name: "IT Consulting", path: "consulting" },
              ].map((service, i) => (
                <li key={i}>
                  <NavLink
                    to={`/services/${service.path}`}
                    className={({ isActive }) =>
                      `text-decoration-none d-block py-1 hover-link ${
                        isActive ? "text-primary fw-semibold" : "text-muted"
                      }`
                    }
                  >
                    {service.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h6 className="text-uppercase fw-semibold mb-3 text-primary">
              Contact Us
            </h6>
            <p className="text-muted d-flex align-items-start gap-2">
              <MapPin size={16} /> 2nd Floor, Shahi-Complex, Gopalganj
            </p>
            <p className="text-muted d-flex align-items-center gap-2">
              <Mail size={16} /> Techivanta@gmail.com
            </p>
            <p className="text-muted d-flex align-items-center gap-2">
              <Phone size={16} /> +91 89860 49042
            </p>
          </div>
        </div>

        <hr className="border-top mt-4" />
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} Techivanta Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
