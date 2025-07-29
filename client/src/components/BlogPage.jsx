import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./BlogPage.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`/api/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setShowModal(false);
  };

  return (
    <section id="blog" className="py-5 bg-light text-dark">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 relative inline-block animate-fadein">
            <span className="relative z-10">Techivanta Blog</span>
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-blue-500 rounded-full z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, updates, and stories from the{" "}
            <span className="text-blue-600 font-semibold">Techivanta</span>{" "}
            team.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="row g-4">
          {blogs.map((blog, index) => (
            <div
              className="col-6 col-sm-6 col-md-4 col-lg-3 animate-slideup"
              style={{ animationDelay: `${index * 100}ms` }}
              key={blog._id}
              onClick={() => openModal(blog)}
            >
              <div className="blog-card h-100 shadow rounded overflow-hidden bg-white hover-shadow transition-all">
                <img
                  src={blog.imageUrl}
                  alt="Blog"
                  className="blog-image w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="p-3">
                  <h5 className="fw-bold mb-2">{blog.title}</h5>
                  <p className="text-muted small">
                    {blog.description.length > 120
                      ? blog.description.slice(0, 120) + "..."
                      : blog.description}
                  </p>
                  <button className="btn btn-outline-primary btn-sm mt-2">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Info Section */}
        <div className="mt-5 py-5 border-top animate-fadein-slow text-center">
          <h4 className="fw-bold text-primary mb-3">Why Follow Our Blog?</h4>
          <p className="text-muted mb-2">
            Stay ahead with real-time insights from the IT industry. Our team
            shares deep dives on software, DevOps, product innovation, and
            digital transformation trends.
          </p>
          <p className="text-muted">
            Whether you're a client, developer, or tech enthusiast — our blog
            delivers value-packed knowledge tailored to you.
          </p>
        </div>
      </div>

      {/* Blog Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog?.imageUrl && (
            <img
              src={selectedBlog.imageUrl}
              alt="Blog"
              className="img-fluid rounded mb-3"
            />
          )}
          <p>{selectedBlog?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Blog;
