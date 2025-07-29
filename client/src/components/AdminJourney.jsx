import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminJourney.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const AdminJourney = () => {
  const [journeys, setJourneys] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    icon: "",
    highlight: false,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchJourneys = async () => {
    try {
      const res = await axios.get(`/api/journey`);
      setJourneys(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(`/api/journey/${editingId}`, data);
      } else {
        await axios.post(`/api/journey`, data);
      }
      fetchJourneys();
      setFormData({
        year: "",
        title: "",
        description: "",
        icon: "",
        highlight: false,
        image: null,
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (journey) => {
    setEditingId(journey._id);
    setFormData({
      year: journey.year,
      title: journey.title,
      description: journey.description,
      icon: journey.icon,
      highlight: journey.highlight,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this journey?")) {
      try {
        await axios.delete(`/api/journey/${id}`);
        fetchJourneys();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredJourneys = journeys.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.year.includes(search)
  );

  return (
    <div className="main-content">
      <div className="admin-journey-container">
        <h2 className="admin-journey-title">
          {editingId ? "Edit" : "Add"} Our Journey
        </h2>

        <form onSubmit={handleSubmit} className="admin-journey-form">
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            placeholder="Icon (e.g. rocket-launch)"
          />
          <div className="checkbox-field">
            <input
              type="checkbox"
              name="highlight"
              checked={formData.highlight}
              onChange={handleInputChange}
            />
            <label>Highlight</label>
          </div>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button type="submit">{editingId ? "Update" : "Submit"}</button>
        </form>

        <div className="journey-header">
          <h2>All Journey Entries</h2>
          <input
            type="text"
            placeholder="Search by year or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="journey-grid">
          {filteredJourneys.map((j) => (
            <div className="journey-card" key={j._id}>
              {j.imageUrl && <img src={j.imageUrl} alt={j.title} />}
              <div className="journey-card-content">
                <h4>
                  {j.year} - {j.title}
                </h4>
                <p>{j.description}</p>
                <div className="actions">
                  <button onClick={() => handleEdit(j)}>Edit</button>
                  <button onClick={() => handleDelete(j._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminJourney;
