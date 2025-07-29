import { useEffect, useState } from "react";
import axios from "axios";
import "./AboutPage.css";

const StatCounter = ({ target, label, isPercent = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / 100;
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(start);
    }, 20);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="text-center">
      <h3 className="display-6 fw-bold text-primary">
        {isPercent ? `${count.toFixed(1)}%` : `${Math.floor(count)}+`}
      </h3>
      <p className="text-secondary">{label}</p>
    </div>
  );
};
const About = () => {
  const [certifications, setCertifications] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [journeys, setJourneys] = useState([]);
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await axios.get("/api/partner");
        setCertifications(res.data);
      } catch (err) {
        console.error("Error fetching certifications:", err);
      }
    };
    fetchCertifications();
  }, []);

  useEffect(() => {
    axios
      .get("/api/employees/count/total")
      .then((res) => setEmployeeCount(res.data.total || 0))
      .catch((err) => console.error("Employee count error", err));

    axios
      .get("/api/projects/count")
      .then((res) => setProjectCount(res.data.count || 0))
      .catch((err) => console.error("Project count error", err));
  }, []);

  const statItems = [
    {
      icon: "👨‍💻",
      target: employeeCount,
      label: "Total Employees",
    },
    {
      icon: "🚀",
      target: projectCount,
      label: "Projects Completed",
    },
    {
      icon: "😊",
      target: 99.9,
      label: "Happy Clients",
      isPercent: true,
    },
    {
      icon: "📅",
      target: 1,
      label: "Years in Business",
    },
  ];
  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const res = await axios.get("/api/journey");
        setJourneys(res.data || []);
      } catch (err) {
        console.error("Error fetching journey data:", err);
      }
    };
    fetchJourneys();
  }, []);

  return (
    <div className="about-us bg-white text-dark" id="about">
      <section className="w-100 py-5 px-3 px-md-5">
        <div className="row align-items-center w-100 m-0">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-3">About Techivanta Pvt. Ltd.</h2>
            <p className="text-secondary">
              Techivanta Pvt. Ltd. is a leading Indian tech firm delivering
              end-to-end digital solutions. We specialize in software
              development, cloud systems, AI solutions, and tech consultancy for
              businesses of all sizes.
            </p>
            <p className="text-secondary">
              Established in 2022, our vision is to enable digital growth across
              industries. With a diverse team of experts, we serve startups,
              enterprises, and government organizations globally.
            </p>
          </div>
          <div className="col-lg-6">
            <video
              className="img-fluid rounded shadow"
              src="/office.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        <div className="row mt-5 w-100 m-0">
          <div className="col-md-4">
            <h5 className="fw-semibold">Our Mission</h5>
            <p className="text-secondary">
              To empower businesses through secure, innovative, and efficient
              digital solutions that accelerate growth and success.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-semibold">Our Vision</h5>
            <p className="text-secondary">
              To become a globally recognized technology partner fostering
              digital transformation through ethical innovation.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-semibold">Our Core Values</h5>
            <ul className="text-secondary ps-3">
              <li>Client-Centric Approach</li>
              <li>Transparency & Integrity</li>
              <li>Technological Excellence</li>
              <li>Growth Mindset</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-100 bg-light py-5 px-3 px-md-5 border-top">
        <div className="container text-center">
          <h2 className="fw-bold mb-2 text-primary display-5">
            Why Choose Us?
          </h2>
          <p className="text-muted fs-5 mb-5">
            Combining creativity, strategy, and technology to build value and
            trust.
          </p>
          <div className="row gy-4">
            {statItems.map((item, i) => (
              <div className="col-6 col-md-4 col-lg-3" key={i}>
                <div className="bg-white rounded-4 shadow-sm p-4 h-100 d-flex flex-column justify-content-center align-items-center hover-scale transition">
                  <div className="display-4 mb-2">{item.icon}</div>
                  <h3 className="text-primary fw-bold mb-1">
                    <StatCounter
                      target={item.target}
                      isPercent={item.isPercent}
                    />
                  </h3>
                  <p className="text-dark fw-semibold mb-0">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-100 py-5 px-3 px-md-5">
        <h2 className="text-center fw-bold mb-4">Meet Our Founders</h2>
        <div className="row justify-content-center text-center gy-4">
          {[
            {
              name: "Mr. Nitish Kumar",
              role: "Founder & CEO",
              edu: "Software Developer",
              img: "https://media.licdn.com/dms/image/v2/D5603AQHGno6fafkaXw/profile-displayphoto-scale_400_400/B56ZhSR1AjG0Ag-/0/1753727076196?e=1756339200&v=beta&t=MseJyzAC8KIS3tgGD_hWgJojfchtu8XfdGTjuVcbB28",
            },
            {
              name: "Mr. Prashant Kumar",
              role: "Co-Founder & CTO",
              edu: "Software Developer",
              img: "https://media.licdn.com/dms/image/v2/C5616AQEHaBvjt8r7yA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1647793766528?e=1756339200&v=beta&t=xQ5ZEfeP2ZqU3EXLRHWWWz1nGt_jbeUBWHKg_oDSYZ0",
            },
          ].map((member, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="team-avatar-wrapper">
                <img src={member.img} alt={member.name} className="img-fluid" />
              </div>

              <h6 className="mt-2 fw-semibold">{member.name}</h6>
              <p className="text-secondary small">{member.edu}</p>
              <p className="text-secondary small">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-100 bg-white py-5 px-5 px-md-5 border-top">
        <div className="container">
          <h2 className="text-center fw-bold mb-4 text-dark">Our Journey</h2>
          <ul className="timeline list-unstyled text-secondary fs-6">
            {journeys.length > 0 ? (
              journeys
                .sort((a, b) => a.year.localeCompare(b.year)) // Optional sorting
                .map((item, idx) => (
                  <li
                    className="mb-5 position-relative journey-snake-item"
                    key={item._id}
                  >
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                      {/* --- Text Block --- */}
                      <div className="journey-text text-md-end text-start">
                        <strong>{item.year}</strong> -{item.icon} {item.title}
                        <p>{item.description}</p>
                      </div>

                      {/* --- Snake Line with Image --- */}
                      <div className="snake-image-wrap position-relative d-flex align-items-center">
                        {/* Snake SVG Line */}
                        <svg
                          className="snake-line"
                          width="300"
                          height="120"
                          viewBox="0 0 300 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id="snakeGradient"
                              x1="0"
                              y1="0"
                              x2="300"
                              y2="0"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0%" stopColor="#4f46e5" />
                              <stop offset="25%" stopColor="#10b981" />
                              <stop offset="50%" stopColor="#f59e0b" />
                              <stop offset="75%" stopColor="#ec4899" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 60 Q75 10, 150 60 T300 60"
                            stroke="url(#snakeGradient)"
                            strokeWidth="4"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray="800"
                            strokeDashoffset="800"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="800;0"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>

                        {/* Round Image */}
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="rounded-image position-absolute end-0 top-50 translate-middle-y"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li>No journey data found.</li>
            )}
          </ul>
        </div>
      </section>

      <section className="w-100 py-5 px-3 px-md-5">
        <h2 className="text-center fw-bold mb-4">Certifications & Partners</h2>
        <div className="row text-center gy-4">
          {certifications.length > 0 ? (
            certifications.map((cert) => (
              <div className="col-6 col-md-3" key={cert._id}>
                <img
                  src={cert.logoUrl}
                  alt={cert.name}
                  className="img-fluid"
                  style={{ height: 60, objectFit: "contain" }}
                />
              </div>
            ))
          ) : (
            <p className="text-secondary text-center">
              No certifications found.
            </p>
          )}
        </div>
      </section>

      <section className="w-100 bg-light py-5 px-3 px-md-5 border-top">
        <div className="container text-center">
          <blockquote className="blockquote">
            <p className="mb-4 fs-4 fst-italic">
              "At Techivanta, innovation meets purpose. We don't just build
              software; we build the future."
            </p>
            <footer className="blockquote-footer">Mr. Nitish Kumar, CEO</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default About;
