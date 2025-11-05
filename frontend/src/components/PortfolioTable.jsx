export default function PortfolioTable({ portfolio, onSymbolClick }) {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thtd = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  };

  const headerStyle = {
    backgroundColor: "#2b5797",
    color: "white",
  };

  const symbolStyle = {
    ...thtd,
    cursor: "pointer",
    color: "#2b5797",
    textDecoration: "underline",
  };

  return (
    <table style={tableStyle}>
      <thead style={headerStyle}>
        <tr>
          <th style={thtd}>Symbol</th>
          <th style={thtd}>Quantity</th>
          <th style={thtd}>Avg Price</th>
          <th style={thtd}>Market Price</th>
          <th style={thtd}>Invested</th>
          <th style={thtd}>Current</th>
          <th style={thtd}>P/L</th>
          <th style={thtd}>% Gain</th>
          <th style={thtd}>Updated</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((stock, i) => (
          <tr key={i}>
            <td
              style={symbolStyle}
              onClick={() => onSymbolClick && onSymbolClick(stock.symbol)}
            >
              {stock.symbol}
            </td>
            <td style={thtd}>{stock.quantity}</td>
            <td style={thtd}>{stock.avg_price}</td>
            <td style={thtd}>{stock.price}</td>
            <td style={thtd}>{stock.invested}</td>
            <td style={thtd}>{stock.current}</td>
            <td style={thtd}>{stock.gain}</td>
            <td style={thtd}>{stock.gain_percent}%</td>
            <td style={thtd}>
              {stock.updated ? new Date(stock.updated).toLocaleString() : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
