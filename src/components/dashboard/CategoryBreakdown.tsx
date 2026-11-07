
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample expense category data
const categoryData = [
  { name: "Food", value: 15000 },
  { name: "Transport", value: 8000 },
  { name: "Shopping", value: 12000 },
  { name: "Bills", value: 10000 },
  { name: "Entertainment", value: 5000 },
  { name: "Others", value: 3000 },
];

// Colors for each category
const COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#f97316",
  "#10b981",
  "#ec4899",
  "#64748b",
];

const CategoryBreakdown = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Expense Category Breakdown
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Expenses by category
        </p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={3}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default CategoryBreakdown;
