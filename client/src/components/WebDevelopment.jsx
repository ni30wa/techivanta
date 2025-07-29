import React from "react";
import ServicePage from "./OurServicePage";
import webImage from "../assest/webdev.jpeg";

const WebDevelopment = () => {
  return (
    <ServicePage
      title="Web Development"
      description="We build high-performance, scalable websites and web apps tailored to your business needs."
      features={[
        "Responsive & SEO-friendly designs",
        "MERN / JAMStack development",
        "Progressive Web Apps (PWAs)",
        "Performance Optimized",
      ]}
      image={webImage}
    />
  );
};

export default WebDevelopment;
