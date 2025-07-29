/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

import "./VerifyDocument.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const VerifyDocument = () => {
  const [docId, setDocId] = useState("");
  const [docType, setDocType] = useState("offerletter");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectDocType = (id) => {
    const lower = id.toLowerCase();
    if (lower.startsWith("ol")) return "offerletter";
    if (lower.startsWith("ct")) return "certificate";
    return "offerletter"; // fallback
  };

  const handleVerify = async () => {
    if (!docId.trim()) {
      setError("⚠️ Please enter a valid ID.");
      return;
    }

    const detectedType = detectDocType(docId);
    setDocType(detectedType);
    setLoading(true);
    setError("");
    setData(null);

    try {
      const route =
        detectedType === "offerletter"
          ? `${baseURL}/api/offerletter/verify/${docId}`
          : `${baseURL}/api/certificate/verify/${docId}`;

      const res = await axios.get(route);
      setData(res.data);
    } catch (err) {
      setError("❌ No record found for this ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="verify-container fade-in">
        <h2 className="verify-heading">📄 Document Verification</h2>
        <p className="verify-subtext">
          Enter a valid Document ID to verify an Offer Letter or Certificate.
        </p>

        <div className="verify-form">
          <input
            type="text"
            className="verify-input"
            placeholder="Enter Document ID (e.g., OL123 or CT456)"
            value={docId}
            onChange={(e) => {
              const value = e.target.value;
              setDocId(value);
              const detected = detectDocType(value);
              setDocType(detected);
            }}
          />

          <p className="verify-detected-type">
            Detected Type:{" "}
            <strong
              style={{
                color: docType === "offerletter" ? "#007bff" : "#28a745",
                textTransform: "uppercase",
              }}
            >
              {docType}
            </strong>
          </p>

          <button className="verify-btn pulse" onClick={handleVerify}>
            🔍 Verify <span className="doc-type-btn">({docType})</span>
          </button>
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner-circle"></div>
            <p>Verifying document...</p>
          </div>
        )}

        {error && <p className="verify-error">{error}</p>}

        {data && (
          <div className="verify-result bounce-in">
            <h4 className="verify-success">✅ Valid Record Found</h4>
            <table className="verify-table">
              <tbody>
                {Object.entries(data)
                  .filter(
                    ([key]) =>
                      key !== "_id" &&
                      key !== "__v" &&
                      key !== "createdAt" &&
                      key !== "updatedAt"
                  )
                  .map(([key, value]) => (
                    <tr key={key}>
                      <td className="verify-key">
                        {key
                          .replace(/([A-Z])/g, " $1") // insert space before capital letters
                          .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
                          .replace(/Id$/, "ID")}{" "}
                        {/* Capitalize ID */}
                      </td>

                      <td className="verify-value">
                        {typeof value === "string" && Date.parse(value)
                          ? new Date(value).toLocaleDateString()
                          : value}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="verify-qr">
              <p>
                <strong>Scan to Verify</strong>
              </p>
              <QRCode
                value={`https://techivanta.onrender.com/verify/${docType}/${docId}`}
                size={160}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VerifyDocument;
