import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="logo-container">
        <svg
          className="animated-logo"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#00f", stopOpacity: 1 }} />
              <stop
                offset="50%"
                style={{ stopColor: "#a0f", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#0ff", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M768 128v128H576v640H448V256H256V128h512z"
            fill="url(#grad)"
          />
        </svg>
        <div className="loading-text">Loading Techivanta...</div>
      </div>
    </div>
  );
};

export default Loading;
