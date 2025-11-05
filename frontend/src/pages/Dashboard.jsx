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
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

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
    } finally {
      setHasLoaded(true);
    }
  };

  // ---- EFFECT: load data when user changes -----------------------
  useEffect(() => {
    fetchPortfolio();
    // persist selection
    if (userName) localStorage.setItem("currentUser", userName);
  }, [userName]);

  // ---- HANDLE SYMBOL CLICK FOR CHART -----------------------------
  const handleSymbolClick = (symbol) => {
    setSelectedSymbol(symbol);
    setShowModal(true);
  };

  // ---- CLOSE MODAL ------------------------------------------------
  const closeModal = () => {
    setShowModal(false);
    setSelectedSymbol(null);
  };

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
  const messageStyle = {
    textAlign: "center",
    color: "#666",
    fontSize: "16px",
    marginBottom: "20px",
    padding: "10px",
    background: "#f9f9f9",
    borderRadius: "6px",
  };
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };
  const modalContentStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80%",
    overflow: "auto",
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
          onKeyDown={(e) => e.key === "Enter" && fetchPortfolio()}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1 1 200px",
          }}
        />
        {/* <button
          onClick={fetchPortfolio}
          disabled={!userName}
          style={{
            padding: "10px 20px",
            background: userName ? "#2b5797" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: userName ? "pointer" : "not-allowed",
          }}
        >
          Load Portfolio
        </button> */}
      </div>

      {/* ---------- MESSAGE IF NO PORTFOLIO ---------- */}
      {hasLoaded && userName && portfolio.length === 0 && (
        <div style={messageStyle}>
          No portfolio found for "{userName}". Add a ticker first using the form
          below.
        </div>
      )}

      {/* ---------- FORM (passes userName) ---------- */}
      <PortfolioForm onSuccess={fetchPortfolio} userName={userName} />

      {/* ---------- CHARTS & TABLE ---------- */}
      {summary && <PortfolioCharts summary={summary} />}
      <PortfolioTable portfolio={portfolio} onSymbolClick={handleSymbolClick} />

      {/* ---------- MODAL FOR TICKER CHART ---------- */}
      {showModal && selectedSymbol && (
        <div style={modalStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedSymbol} Historical Chart</h2>
            <TickerChart symbol={selectedSymbol} />
            <button
              onClick={closeModal}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "#2b5797",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- TICKER CHART COMPONENT ---------------------------------------
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TickerChart({ symbol }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming API key is available; in production, fetch from backend
        const API_KEY = "101b8d53825c4256a712327c656a2dde"; // Replace with actual key or fetch from env
        const res = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${API_KEY}`
        );
        if (res.data.values) {
          const chartData = res.data.values.reverse().map((item) => ({
            date: item.datetime.split(" ")[0],
            price: parseFloat(item.close),
          }));
          setData(chartData);
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  if (loading) return <p>Loading chart...</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#2b5797" />
      </LineChart>
    </ResponsiveContainer>
  );
}
