import React from "react";
import ServicePage from "./OurServicePage";
import mobileImage from "../assest/appdev.jpeg"; // Replace with actual image

const MobileAppDevelopment = () => {
  return (
    <ServicePage
      title="Mobile App Development"
      description="We design and develop user-friendly Android and iOS mobile apps for startups and enterprises alike."
      features={[
        "Cross-platform (Flutter / React Native)",
        "Custom Native Apps",
        "Play Store & App Store Launch",
        "Performance & Security Focused",
      ]}
      image={mobileImage}
    />
  );
};

export default MobileAppDevelopment;
