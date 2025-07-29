import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminGallery.css";
import { motion } from "framer-motion";

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("/api/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !editingId) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.delete(`/api/gallery/${editingId}`);
      }
      await axios.post("/api/gallery", formData);
      setEditingId(null);
      setImage(null);
      setDescription("");
      setCategory("general");
      fetchGallery();
    } catch (err) {
      console.error("Upload error:", err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setDescription(item.description);
    setCategory(item.category);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`/api/gallery/${id}`);
        fetchGallery();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="admin-gallery">
      <h2>Manage Gallery</h2>

      <form className="gallery-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="general">General</option>
          <option value="event">Event</option>
          <option value="award">Award</option>
          <option value="soothing">Soothing</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {editingId ? "Update" : "Upload"}
        </button>
      </form>

      <div className="gallery-grid">
        {gallery.map((item) => (
          <motion.div
            className="gallery-card"
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={item.imageUrl} alt="gallery" />
            <div className="gallery-info">
              <p>{item.description}</p>
              <small>{item.category}</small>
              <div className="gallery-actions">
                <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button onClick={() => handleDelete(item._id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
