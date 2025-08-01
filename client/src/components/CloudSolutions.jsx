import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Cloud, Cpu, Repeat, LifeBuoy } from "lucide-react";
import "./Aiml.css"; // Shared styling

const services = [
  {
    icon: <Cloud size={32} className="text-blue-400 mx-auto" />,
    title: "Cloud Integration",
    desc: "Seamlessly connect with AWS, Azure, or Google Cloud for scalable services.",
  },
  {
    icon: <Cpu size={32} className="text-blue-400 mx-auto" />,
    title: "Serverless Architecture",
    desc: "Build flexible apps without managing infrastructure using modern FaaS solutions.",
  },
  {
    icon: <Repeat size={32} className="text-blue-400 mx-auto" />,
    title: "Migration & DevOps",
    desc: "Migrate to the cloud with automated CI/CD pipelines and DevOps best practices.",
  },
  {
    icon: <LifeBuoy size={32} className="text-blue-400 mx-auto" />,
    title: "24/7 Monitoring",
    desc: "We monitor and support your infrastructure round the clock to ensure uptime.",
  },
];

const CloudSolutions = () => {
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
          Cloud Solutions & Services
        </h1>
        <p className="hero-desc">
          Empower your business with scalable, secure, and cost-efficient cloud
          infrastructure tailored to your goals.
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
          Move your business to the cloud, the smart way.
        </h3>
        <p className="cta-desc">
          Techivanta Pvt. Ltd. helps you migrate, optimize, and secure your
          cloud infrastructure.
        </p>
        <button className="cta-button" onClick={() => navigate("/contact")}>
          Get in Touch
        </button>
      </div>
    </motion.div>
  );
};

export default CloudSolutions;
