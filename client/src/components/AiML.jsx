import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { Bot, BrainCircuit, LineChart, Network } from "lucide-react";
import "./Aiml.css";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: <Bot size={32} className="text-blue-400 mx-auto" />,
    title: "AI-Powered Automation",
    desc: "Boost productivity with smart workflow automation and decision systems.",
  },
  {
    icon: <BrainCircuit size={32} className="text-blue-400 mx-auto" />,
    title: "Machine Learning Models",
    desc: "Custom ML models tailored for predictions, classification, and clustering.",
  },
  {
    icon: <LineChart size={32} className="text-blue-400 mx-auto" />,
    title: "Data Analytics",
    desc: "Unlock insights with deep learning and pattern recognition from your data.",
  },
  {
    icon: <Network size={32} className="text-blue-400 mx-auto" />,
    title: "AI Strategy Consulting",
    desc: "We guide your business from idea to implementation in AI/ML.",
  },
];

const useCases = [
  "Customer behavior prediction",
  "Fraud detection & prevention",
  "AI chatbots & virtual assistants",
  "Demand forecasting",
  "Medical image analysis",
  "Natural Language Processing",
];

const techStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "OpenCV",
  "Pandas",
  "Keras",
  "NLP",
  "Computer Vision",
  "Deep Learning",
];

const AiMlSolutions = () => {
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
          AI & Machine Learning Solutions
        </h1>
        <p className="hero-desc">
          Revolutionize your business with the power of AI/ML, crafted by
          Techivanta Pvt. Ltd.
        </p>
      </div>

      {/* Services Section */}
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

      {/* Use Cases */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-6">
          Real-World Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((item, idx) => (
            <div key={idx} className="usecase-card">
              ✅ {item}
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-6">
          Technologies We Use
        </h2>
        <div className="flex flex-wrap gap-4">
          {techStack.map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          Ready to integrate AI into your business?
        </h3>
        <p className="cta-desc">
          Let Techivanta Pvt. Ltd. build innovative solutions for you.
        </p>
        <button className="cta-button" onClick={() => navigate("/contact")}>
          Get in Touch
        </button>
      </div>
    </motion.div>
  );
};

export default AiMlSolutions;
