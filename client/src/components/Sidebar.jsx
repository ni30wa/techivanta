import {
  FolderPlus,
  Home,
  Mail,
  CircleFadingPlus,
  UsersRound,
  Handshake,
  Settings,
  ChartNoAxesCombined,
  GraduationCap,
  IdCardLanyard,
  Route,
  FileCheck2,
  Images,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/admin/dashboard", icon: <Home />, label: "Home" },
    { path: "/admin/dashboard/messages", icon: <Mail />, label: "Messages" },
    {
      path: "/admin/dashboard/projects",
      icon: <FolderPlus />,
      label: "Add Projects",
    },
    {
      path: "/admin/dashboard/blogs",
      icon: <CircleFadingPlus />,
      label: "Add Blogs",
    },
    {
      path: "/admin/dashboard/customer",
      icon: <UsersRound />,
      label: "Customers",
    },
    {
      path: "/admin/dashboard/job",
      icon: <Handshake />,
      label: "Internship/Job",
    },
    { path: "/admin/dashboard/service", icon: <Settings />, label: "Service" },
    {
      path: "/admin/dashboard/career",
      icon: <ChartNoAxesCombined />,
      label: "Careers",
    },
    {
      path: "/admin/dashboard/partner",
      icon: <GraduationCap />,
      label: "Official Partner",
    },
    {
      path: "/admin/dashboard/employee",
      icon: <IdCardLanyard />,
      label: "Employee Details",
    },
    {
      path: "/admin/dashboard/journey",
      icon: <Route />,
      label: "Journey Details",
    },
    {
      path: "/admin/dashboard/certificate",
      icon: <FileCheck2 />,
      label: "Certificate",
    },
    { path: "/admin/dashboard/gallery", icon: <Images />, label: "Gallery" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <Link to="/admin/dashboard" className="brand-link">
          <span>Dashboard</span>
        </Link>
        <hr />
      </div>

      <div className="menu-scroll">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`menu-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr />
      <div className="sidebar-footer">
        <div className="dropdown">
          <a
            href="#"
            className="dropdown-toggle user-info"
            data-bs-toggle="dropdown"
          >
            <img src="/4.jpg" alt="User" className="user-avatar" />
            <strong>{user.email}</strong>
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/" className="dropdown-item">
                View Site
              </Link>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li onClick={logout}>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
