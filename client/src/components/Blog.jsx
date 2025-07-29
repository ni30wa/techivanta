import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./Blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
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
      <div className="mx-4">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 relative inline-block">
            <span className="relative z-10">Techivanta Blog</span>
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-blue-500 rounded-full z-0"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, updates, and stories from the{" "}
            <span className="text-blue-600 font-medium">Techivanta</span> team.
          </p>
        </div>

        {/* Featured Blog Post */}
        {blogs[0] && (
          <div className="row mb-5">
            <div className="col-md-6">
              <img
                src={blogs[0].imageUrl}
                alt="Featured Blog"
                className="img-fluid rounded-md border w-100 object-cover"
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h3 className="fw-bold">{blogs[0].title}</h3>
              <p className="text-muted">{blogs[0].description}</p>
              <button
                onClick={() => openModal(blogs[0])}
                className="btn btn-primary btn-sm w-fit"
              >
                Read More
              </button>
            </div>
          </div>
        )}

        {/* Horizontal Scroll Blog Grid */}
        <div className="horizontal-scroll-container mt-4 mb-5 px-2">
          {blogs.slice(1).map((blog, index) => (
            <div
              key={blog._id}
              className="blog-card"
              style={{ "--delay": `${index * 100}ms` }}
              onClick={() => openModal(blog)}
            >
              <img src={blog.imageUrl} alt="Blog" className="blog-image" />
              <div className="blog-card-body">
                <h5 className="fw-bold">{blog.title}</h5>
                <p className="text-muted small">
                  {blog.description.length > 100
                    ? blog.description.slice(0, 100) + "..."
                    : blog.description}
                </p>
              </div>
            </div>
          ))}
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
