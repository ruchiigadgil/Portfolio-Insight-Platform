import { useState } from "react";
import axios from "axios";

export default function PortfolioForm({ onSuccess, userName }) {
  const [form, setForm] = useState({
    user_name: userName || "",
    symbol: "",
    quantity: "",
    avg_price: "",
  });

  const availableSymbols = ["AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "META"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Force the current user (in case input is empty)
    const payload = { ...form, user_name: userName };
    await axios.post("http://127.0.0.1:5000/api/add-portfolio", payload);

    // reset form but keep the user
    setForm({ user_name: userName, symbol: "", quantity: "", avg_price: "" });
    onSuccess(); // refresh dashboard
  };

  const formContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px",
  };
  const inputStyle = {
    flex: "1 1 180px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  };
  const selectStyle = {
    ...inputStyle,
    background: "white",
  };
  const buttonStyle = {
    backgroundColor: "#2b5797",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <form style={formContainer} onSubmit={handleSubmit}>
      <select
        name="symbol"
        value={form.symbol}
        onChange={handleChange}
        style={selectStyle}
        required
      >
        <option value="">Select Symbol</option>
        {availableSymbols.map((sym) => (
          <option key={sym} value={sym}>
            {sym}
          </option>
        ))}
      </select>
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="avg_price"
        type="number"
        placeholder="Avg Price"
        value={form.avg_price}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <button type="submit" style={buttonStyle}>
        Add
      </button>
    </form>
  );
}
