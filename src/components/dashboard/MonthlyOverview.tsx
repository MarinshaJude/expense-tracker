
import { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample monthly data
const monthlyData = [
  { month: "Jan", year: "2026", income: 50000, expenses: 30000 },
  { month: "Feb", year: "2026", income: 60000, expenses: 35000 },
  { month: "Mar", year: "2026", income: 55000, expenses: 40000 },
  { month: "Apr", year: "2026", income: 70000, expenses: 45000 },
  { month: "May", year: "2026", income: 65000, expenses: 38000 },
  { month: "Jun", year: "2026", income: 80000, expenses: 50000 },
];

const MonthlyOverview = () => {

  // Selected month and year
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedYear, setSelectedYear] = useState("2026");

  // Filter data based on selected month and year
  const filteredData = monthlyData.filter(
    (item) =>
      item.month === selectedMonth &&
      item.year === selectedYear
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">

      {/* Heading and Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Monthly Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Income vs Expenses
          </p>
        </div>

        {/* Month and Year Selectors */}
        <div className="flex gap-3">

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>

        </div>
      </div>

      {/* Monthly Income vs Expenses Chart */}
      <div className="w-full h-80">

        {filteredData.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={filteredData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              {/* Income Bar */}
              <Bar
                dataKey="income"
                name="Income"
                fill="#8b5cf6"
                radius={[5, 5, 0, 0]}
              />

              {/* Expenses Bar */}
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#f97316"
                radius={[5, 5, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        ) : (

          <p className="text-center text-sm text-slate-400 pt-20">
            No data available for the selected month and year.
          </p>

        )}

      </div>

    </div>
  );
};

export default MonthlyOverview;
