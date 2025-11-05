import { useState, useEffect } from "react";
import axios from "axios";
import PortfolioForm from "../components/PortfolioForm";
import PortfolioTable from "../components/PortfolioTable";
import PortfolioCharts from "../components/PortfolioCharts";

export default function Dashboard() {
  // ---- USER STATE -------------------------------------------------
  const savedUser = localStorage.getItem("currentUser") || "";
  const [userName, setUserName] = useState(savedUser);
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState(null);

  // ---- FETCH PORTFOLIO --------------------------------------------
  const fetchPortfolio = async () => {
    if (!userName) return; // nothing to fetch yet
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/portfolio/${userName}`
      );
      setPortfolio(res.data.portfolio ?? []);
      setSummary(res.data.summary ?? null);
    } catch (err) {
      console.error("fetchPortfolio error:", err);
      setPortfolio([]);
      setSummary(null);
    }
  };

  // ---- EFFECT: load data when user changes -----------------------
  useEffect(() => {
    fetchPortfolio();
    // persist selection
    if (userName) localStorage.setItem("currentUser", userName);
  }, [userName]);

  // ---- STYLES -----------------------------------------------------
  const dashboardStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  };
  const titleStyle = {
    textAlign: "center",
    color: "#2b5797",
    fontSize: "28px",
    marginBottom: "20px",
  };
  const userBarStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center",
    flexWrap: "wrap",
  };

  // ---- RENDER -----------------------------------------------------
  return (
    <div style={dashboardStyle}>
      <h1 style={titleStyle}>Portfolio Dashboard</h1>

      {/* ---------- USER SELECTOR ---------- */}
      <div style={userBarStyle}>
        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1 1 200px",
          }}
        />
        <button
          onClick={fetchPortfolio}
          style={{
            padding: "10px 20px",
            background: "#2b5797",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Load Portfolio
        </button>
      </div>

      {/* ---------- FORM (passes userName) ---------- */}
      <PortfolioForm onSuccess={fetchPortfolio} userName={userName} />

      {/* ---------- CHARTS & TABLE ---------- */}
      {summary && <PortfolioCharts summary={summary} />}
      <PortfolioTable portfolio={portfolio} />
    </div>
  );
}
