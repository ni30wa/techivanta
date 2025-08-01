import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { Lightbulb, ShieldCheck, Server, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Aiml.css"; // Reuse same styles as AiMlSolutions

const services = [
  {
    icon: <Lightbulb size={32} className="text-blue-400 mx-auto" />,
    title: "Technology Strategy",
    desc: "Align your IT investments with your long-term business goals.",
  },
  {
    icon: <ShieldCheck size={32} className="text-blue-400 mx-auto" />,
    title: "Cybersecurity Consulting",
    desc: "Identify and mitigate security risks with expert audits and compliance planning.",
  },
  {
    icon: <Server size={32} className="text-blue-400 mx-auto" />,
    title: "Infrastructure Assessment",
    desc: "Evaluate and modernize your IT infrastructure for performance and scalability.",
  },
  {
    icon: <Settings2 size={32} className="text-blue-400 mx-auto" />,
    title: "Tailored IT Solutions",
    desc: "Custom consulting services built around your industry and business needs.",
  },
];

const ITConsulting = () => {
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
          IT Consulting Services
        </h1>
        <p className="hero-desc">
          Get expert IT guidance to drive digital transformation, optimize
          operations, and reduce risk — with Techivanta Pvt. Ltd.
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
          Need an IT expert for your business?
        </h3>
        <p className="cta-desc">
          Techivanta Pvt. Ltd. helps you plan, secure, and scale your IT with
          confidence.
        </p>
        <button className="cta-button" onClick={() => navigate("/contact")}>
          Get in Touch
        </button>
      </div>
    </motion.div>
  );
};

export default ITConsulting;
