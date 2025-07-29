import React from "react";
import { motion } from "framer-motion";
import "./OurServicePage.css";

const ServicePage = ({ title, description, features, image }) => {
  return (
    <div className="service-wrapper">
      <motion.div
        className="service-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="service-title">{title}</h1>
        <p className="service-description">{description}</p>
        <ul className="service-features">
          {features.map((item, idx) => (
            <li key={idx} className="feature-item">
              ✅ {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.img
        src={image}
        alt={title}
        className="service-image"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
    </div>
  );
};

export default ServicePage;
