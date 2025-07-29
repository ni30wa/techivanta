import React from "react";
import ServicePage from "./OurServicePage";
import consultingImage from "../assest/conse.jpeg"; // Replace with actual image

const ITConsulting = () => {
  return (
    <ServicePage
      title="IT Consulting"
      description="Get expert IT guidance to drive digital transformation, optimize operations, and reduce risk."
      features={[
        "Technology Strategy",
        "Cybersecurity Consulting",
        "Infrastructure Assessment",
        "Tailored Business IT Solutions",
      ]}
      image={consultingImage}
    />
  );
};

export default ITConsulting;
