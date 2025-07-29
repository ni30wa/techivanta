import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBlog.css";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      if (editingId) {
        await axios.put(`/api/blogs/${editingId}`, formData);
      } else {
        await axios.post("/api/blogs", formData);
      }
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error(err);
        alert("Error deleting blog");
      }
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, description: blog.description, image: null });
    setEditingId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({ title: "", description: "", image: null });
    setEditingId(null);
  };

  return (
    <div className="main-content">
      <div className="blog-container">
        <h1 className="blog-title">
          {editingId ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>

        {/* Blog Form */}
        <form onSubmit={handleSubmit} className="blog-form">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button type="submit">
              {editingId ? "Update Blog" : "Create Blog"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Blog List */}
        <h2 className="blog-subtitle">All Blogs</h2>
        {blogs.length === 0 ? (
          <p className="no-blogs">No blogs available.</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="blog-image"
                  />
                )}
                <div className="blog-content">
                  <h3>{blog.title}</h3>
                  <p>
                    {blog.description.slice(0, 100)}
                    {blog.description.length > 100 ? "..." : ""}
                  </p>
                  <div className="card-buttons">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
