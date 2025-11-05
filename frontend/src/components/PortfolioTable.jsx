export default function PortfolioTable({ portfolio }) {
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

  return (
    <table style={tableStyle}>
      <thead style={headerStyle}>
        <tr>
          <th style={thtd}>Symbol</th>
          <th style={thtd}>Quantity</th>
          <th style={thtd}>Avg Price</th>
          <th style={thtd}>Market Price</th>
          <th style={thtd}>P/L</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((stock, i) => (
          <tr key={i}>
            <td style={thtd}>{stock.symbol}</td>
            <td style={thtd}>{stock.quantity}</td>
            <td style={thtd}>{stock.avg_price}</td>
            <td style={thtd}>{stock.price}</td>
            <td style={thtd}>
              {((stock.price - stock.avg_price) * stock.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
