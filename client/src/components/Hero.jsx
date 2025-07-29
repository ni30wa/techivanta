import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "GDP ($T)", value: 3.73 },
  { name: "Startups", value: 92000 },
  { name: "AI Score", value: 7.5 },
  { name: "Tech Talent (M)", value: 5.2 },
  { name: "Internet Users (M)", value: 850 },
];

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-wrapper">
      <div className="hero-container row">
        {/* Left: Text Content */}
        <div className="col-lg-6 hero-text">
          <h1>
            Empowering Your Digital <br />
            Future with <span className="highlight">Techivanta</span>
          </h1>
          <p>
            We build scalable and smart software solutions that drive India’s
            tech growth. Trusted by 2024 clients across industries.
          </p>
          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/contact")}
            >
              Get in Touch
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/aboutus")}
            >
              More Details
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/service")}
            >
              Service
            </button>
          </div>
        </div>

        {/* Right: Video */}
        <div className="col-lg-6 video-col">
          <div className="positioned-video-container">
            <video src="/home.mp4" autoPlay muted loop playsInline />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>India’s Tech Stats</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} style={{ background: "transparent" }}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#60a5fa" }}
            />
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeroSection;
