/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "./VerifyDocument.css";

const baseURL = import.meta.env.VITE_SERVER_URL;

const VerifyDocument = () => {
  const [docId, setDocId] = useState("");
  const [docType, setDocType] = useState("offerletter");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectDocType = (id) => {
    const upper = id.toUpperCase();
    if (upper.includes("OL")) return "offerletter";
    if (upper.includes("CT")) return "certificate";
    if (upper.includes("EX")) return "experienceletter";
    return "offerletter";
  };

  const flattenObject = (obj) => {
    const excludedKeys = ["_id", "__v", "createdAt", "updatedAt"];
    const result = [];

    for (const [key, value] of Object.entries(obj)) {
      if (excludedKeys.includes(key)) continue;
      if (value === null || value === undefined) continue;

      if (typeof value === "string" && Date.parse(value)) {
        result.push([key, new Date(value).toLocaleString()]);
      } else if (Array.isArray(value)) {
        result.push([
          key,
          value
            .map((item) =>
              typeof item === "object" ? JSON.stringify(item) : item
            )
            .join(", "),
        ]);
      } else if (typeof value === "object") {
        for (const [k, v] of Object.entries(value)) {
          if (excludedKeys.includes(k)) continue;
          result.push([
            `${key}.${k}`,
            typeof v === "object" ? JSON.stringify(v) : v,
          ]);
        }
      } else {
        result.push([key, value]);
      }
    }

    return result;
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
    setData([]);

    try {
      let route = "";

      if (detectedType === "offerletter") {
        route = `${baseURL}/api/offerletter/verify/${docId}`;
      } else if (detectedType === "certificate") {
        route = `${baseURL}/api/certificate/verify/${docId}`;
      } else if (detectedType === "experienceletter") {
        route = `${baseURL}/api/excertificates/verify/${docId}`;
      }

      const res = await axios.get(route);
      const rawData = res.data?.data || res.data;

      if (rawData && typeof rawData === "object") {
        const flatData = flattenObject(rawData);
        setData(flatData);
      } else {
        setError("❌ Invalid response format.");
      }
    } catch (err) {
      setError("❌ No record found for this ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container fade-in">
      <h2 className="verify-heading">📄 Document Verification</h2>
      <p className="verify-subtext">
        Enter a valid Document ID like <strong>TV-IN-2508OL01</strong>,{" "}
        <strong>TV-IN-2508CT01</strong>, or <strong>TV-IN-2508EX01</strong>.
      </p>

      <div className="verify-form">
        <input
          type="text"
          className="verify-input"
          placeholder="Enter Document ID (e.g., TV-IN-2508OL01)"
          value={docId}
          onChange={(e) => {
            const value = e.target.value;
            setDocId(value);
            setDocType(detectDocType(value));
          }}
        />

        <p className="verify-detected-type">
          Detected Type:{" "}
          <strong
            style={{
              color:
                docType === "offerletter"
                  ? "#007bff"
                  : docType === "certificate"
                  ? "#28a745"
                  : "#d63384",
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

      {data.length > 0 && (
        <div className="verify-result bounce-in">
          <h4 className="verify-success">✅ Valid Record Found</h4>
          <table className="verify-table">
            <tbody>
              {data.map(([key, value], index) => (
                <tr key={index}>
                  <td className="verify-key">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .replace(/Id$/, "ID")}
                  </td>
                  <td className="verify-value">{value}</td>
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
  );
};

export default VerifyDocument;
