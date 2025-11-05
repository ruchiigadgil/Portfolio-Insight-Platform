import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function PortfolioCharts({ summary }) {
  const data = Object.entries(summary).map(([symbol, val]) => ({
    name: symbol,
    value: val,
  }));

  const COLORS = ["#2b5797", "#8ecae6", "#ffb703", "#219ebc", "#fb8500"];

  return (
    <div style={{ height: "300px", marginBottom: "30px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
