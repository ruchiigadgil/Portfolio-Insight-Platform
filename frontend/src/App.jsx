import Dashboard from "./pages/Dashboard";

export default function App() {
  const appStyle = {
    fontFamily: "Segoe UI, Arial, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    padding: "40px",
  };

  return (
    <div style={appStyle}>
      <Dashboard />
    </div>
  );
}
