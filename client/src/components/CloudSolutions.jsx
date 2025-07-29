import React from "react";
import ServicePage from "./OurServicePage";
import cloudImage from "../assest/cloud.jpeg";

const CloudSolutions = () => {
  return (
    <ServicePage
      title="Cloud Solutions"
      description="Empower your business with reliable, scalable, and secure cloud infrastructure and services tailored to your needs."
      features={[
        "AWS / Azure / GCP integration",
        "Serverless Architecture",
        "Cloud Migrations & DevOps",
        "24/7 Monitoring & Support",
      ]}
      image={cloudImage}
    />
  );
};

export default CloudSolutions;
