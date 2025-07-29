import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminMessages.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getAllMessages = async () => {
      try {
        const res = await axios.get("/api/contact");
        // Sort by newest first
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMessages(sorted);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getAllMessages();
    }
  }, []);

  const isNewMessage = (createdAt) => {
    const now = new Date();
    const msgDate = new Date(createdAt);
    const diffHours = (now - msgDate) / (1000 * 60 * 60);
    return diffHours < 24;
  };

  return (
    <div className="main-content">
      <div className="admin-messages-container">
        <h2 className="messages-title">📬 Admin Messages</h2>

        {loading ? (
          <p className="loading-text">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="empty-text">No messages found.</p>
        ) : (
          <div className="message-list">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`message-card ${
                  isNewMessage(msg.createdAt) ? "new-message" : ""
                }`}
              >
                <div className="message-header">
                  <h5 className="sender">
                    {msg.name} ({msg.email}) ({msg.phone})
                  </h5>
                  {isNewMessage(msg.createdAt) && (
                    <span className="new-badge">NEW</span>
                  )}
                </div>
                <p className="message-content">{msg.message}</p>
                <small className="timestamp">
                  Sent on: {new Date(msg.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
