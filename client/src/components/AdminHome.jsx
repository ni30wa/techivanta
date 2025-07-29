import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import {
  Briefcase,
  MessageCircle,
  Users,
  Layers,
  ClipboardList,
} from "lucide-react";

import "./AdminHome.css";
const baseURL = "process.env.VITE_API_BASE_URL";

const AdminHome = () => {
  const [userStats, setUserStats] = useState([]);
  const [revenueStats, setRevenueStats] = useState([]);
  const [counts, setCounts] = useState({
    jobs: 0,
    messages: 0,
    careers: 0,
    projects: 0,
    customers: 0,
    employees: 0,
    resignemployees: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [job, msg, career, project, customer, employee, resignemployees] =
          await Promise.all([
            axios.get(`/api/jobs/count`),
            axios.get(`/api/contact/count`),
            axios.get(`/api/applicants/count`),
            axios.get(`/api/projects/count`),
            axios.get(`/api/customers/count`),
            axios.get(`/api/employees/count/total`),
            axios.get(`/api/employees/count/resign`),
          ]);

        setCounts({
          jobs: job.data?.count || 0,
          messages: msg.data?.count || 0,
          careers: career.data?.count || 0,
          projects: project.data?.count || 0,
          customers: customer.data?.count || 0,
          employees: employee.data?.total || 0,
          resignemployees: resignemployees.data?.count || 0,
        });

        const [userStatsRes, revenueStatsRes] = await Promise.all([
          axios.get(`/api/customers/monthly-stats`),
          axios.get(`/api/projects/monthly-revenue`),
        ]);

        setUserStats(userStatsRes.data || []);
        setRevenueStats(revenueStatsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    {
      label: "Jobs",
      value: counts.jobs,
      company: "Recruit Inc.",
      description: "Available job postings on the platform.",
      icon: <Briefcase size={22} className="text-white" />,
      bg: "bg-green",
    },
    {
      label: "Messages",
      value: counts.messages,
      company: "Contact System",
      description: "User messages and inquiries.",
      icon: <MessageCircle size={22} className="text-white" />,
      bg: "bg-yellow",
    },
    {
      label: "Careers",
      value: counts.careers,
      company: "Total student applied",
      description: "Applications for career positions.",
      icon: <ClipboardList size={22} className="text-white" />,
      bg: "bg-blue",
    },
    {
      label: "Projects",
      value: counts.projects,
      company: "Total Projects Done",
      description: "Projects submitted and tracked.",
      icon: <Layers size={22} className="text-white" />,
      bg: "bg-indigo",
    },
    {
      label: "Clients",
      value: counts.customers,
      company: "Total Clients",
      description: "Total customers request all services.",
      icon: <Users size={22} className="text-white" />,
      bg: "bg-emerald",
    },
    {
      label: "Employees",
      value: counts.employees,
      company: "Total Employees",
      description: "Total Employees worked in current time.",
      icon: <Users size={22} className="text-white" />,
      bg: "bg-blue",
    },
    {
      label: "Resigned Employees",
      value: counts.resignemployees,
      company: "Total Resigned Employees",
      description: "Total resigned employees track..",
      icon: <Users size={22} className="text-white" />,
      bg: "bg-danger",
    },
  ];

  return (
    <div className="main-content">
      <div className="admin-container">
        <div className="admin-header">
          <h2 className="admin-title">Dashboard</h2>
        </div>

        <div className="card-grid">
          {cardData.map((card, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <div className={`icon-badge ${card.bg}`}>{card.icon}</div>
                <span className="just-now">Just now</span>
              </div>
              <h4 className="card-company">{card.company}</h4>
              <h3 className="card-label">
                {card.label}: {card.value}
              </h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="chart-grid">
          <div className="chart-box">
            <h3 className="chart-title">Monthly User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3 className="chart-title">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
