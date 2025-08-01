import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Globe, ServerCog, TrendingUp } from "lucide-react";
import "./Aiml.css"; // Same shared style file

const services = [
  {
    icon: <LayoutDashboard size={32} className="text-blue-400 mx-auto" />,
    title: "Responsive Design",
    desc: "We create pixel-perfect designs that look great on all devices and screen sizes.",
  },
  {
    icon: <Globe size={32} className="text-blue-400 mx-auto" />,
    title: "SEO-Friendly Websites",
    desc: "Boost your search engine visibility with optimized HTML and best practices.",
  },
  {
    icon: <ServerCog size={32} className="text-blue-400 mx-auto" />,
    title: "Modern Tech Stack",
    desc: "We specialize in MERN, JAMStack, and headless CMS integrations.",
  },
  {
    icon: <TrendingUp size={32} className="text-blue-400 mx-auto" />,
    title: "Performance First",
    desc: "Our web apps are lightning-fast, secure, and built for scale.",
  },
];

const WebDevelopment = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loading />;

  return (
    <motion.div
      className="ai-ml-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="hero-title animate-text-gradient">
          Web Development Services
        </h1>
        <p className="hero-desc">
          We build high-performance, scalable websites and web apps tailored to
          your business needs.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {services.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="glass-card animate-pulse-border"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2 text-white">
              {item.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta-section">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          Ready to launch your next web project?
        </h3>
        <p className="cta-desc">
          Techivanta Pvt. Ltd. builds modern, secure, and engaging websites that
          convert.
        </p>
        <button className="cta-button" onClick={() => navigate("/contact")}>
          Get in Touch
        </button>
      </div>
    </motion.div>
  );
};

export default WebDevelopment;
