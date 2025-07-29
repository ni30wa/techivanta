import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const GalleryAwards = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/gallery`)
      .then((res) => {
        setGalleryItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-awards-container">
      <div className="company-intro">
        <h1>About Techivanta</h1>
        <p>
          Techivanta Pvt. Ltd. is a forward-thinking IT solutions company
          committed to driving innovation in software development, web
          technology, industrial training, and digital transformation. With a
          focus on quality, creativity, and impact, Techivanta empowers
          businesses and individuals through cutting-edge technology solutions
          and industry-aligned education. Recognized for excellence across
          sectors, Techivanta continues to expand its footprint through trust,
          integrity, and a passion for innovation.
        </p>
      </div>

      <h2 className="gallery-awards-title">Achievements & Awards</h2>

      {loading ? (
        <div className="gallery-awards-loading">Loading...</div>
      ) : (
        <div className="gallery-awards-grid">
          {galleryItems.map((item, index) => (
            <div
              key={item._id}
              className="gallery-awards-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={item.imageUrl} alt={item.description} />
              <div className="gallery-awards-caption">{item.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAwards;
