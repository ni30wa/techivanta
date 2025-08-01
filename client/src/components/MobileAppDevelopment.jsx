import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Smartphone, Rocket, Shield, Code } from "lucide-react";
import "./Aiml.css"; // Same design reused

const services = [
  {
    icon: <Smartphone size={32} className="text-blue-400 mx-auto" />,
    title: "Cross-platform Apps",
    desc: "Build efficient apps using Flutter or React Native for both Android & iOS.",
  },
  {
    icon: <Code size={32} className="text-blue-400 mx-auto" />,
    title: "Custom Native Apps",
    desc: "Fully optimized native Android and iOS apps with smooth UX and performance.",
  },
  {
    icon: <Rocket size={32} className="text-blue-400 mx-auto" />,
    title: "App Store Launch",
    desc: "Get your app published on Play Store & App Store with full launch support.",
  },
  {
    icon: <Shield size={32} className="text-blue-400 mx-auto" />,
    title: "Security & Speed",
    desc: "We prioritize top-notch app security and lightning-fast performance.",
  },
];

const MobileAppDevelopment = () => {
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
          Mobile App Development
        </h1>
        <p className="hero-desc">
          We design and develop user-friendly Android and iOS mobile apps for
          startups and enterprises alike.
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
          Want a powerful mobile app for your business?
        </h3>
        <p className="cta-desc">
          Techivanta Pvt. Ltd. turns your app idea into a high-performance
          reality.
        </p>
        <button className="cta-button" onClick={() => navigate("/contact")}>
          Get in Touch
        </button>
      </div>
    </motion.div>
  );
};

export default MobileAppDevelopment;
