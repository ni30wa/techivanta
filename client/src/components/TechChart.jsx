import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "GDP (Trillion $)", value: 3.73 },
  { name: "Startups", value: 92000 },
  { name: "AI Readiness", value: 7.5 },
  { name: "Tech Talent (M)", value: 5.2 },
  { name: "Internet Users (M)", value: 850 },
];

export const TechChart = () => (
  <div style={{ width: "100%", height: 300, marginTop: "4rem" }}>
    <h2 style={{ textAlign: "center", color: "#fff" }}>India’s Tech Stats</h2>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Bar dataKey="value" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
