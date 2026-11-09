
import useTransactions from "../../hooks/useTransactions";

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

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

interface MonthlyOverviewProps {
  selectedMonth: string;
  selectedYear: string;
  setSelectedMonth: (month: string) => void;
  setSelectedYear: (year: string) => void;
}

const MonthlyOverview = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}: MonthlyOverviewProps) => {

  const { transactions } = useTransactions();

  const monthlyTransactions = transactions.filter((transaction) => {
    return (
      transaction.date.slice(0, 4) === selectedYear &&
      transaction.date.slice(5, 7) === selectedMonth
    );
  });

  const totalIncome = monthlyTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = monthlyTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const chartData = [
    {
      month: months.find((month) => month.value === selectedMonth)?.label,
      income: totalIncome,
      expenses: totalExpenses,
    },
  ];

  const hasData = monthlyTransactions.length > 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Monthly Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Income vs Expenses
          </p>
        </div>

        <div className="flex gap-3">

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
          >
            {[2025, 2026, 2027].map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>

        </div>
      </div>

      <div className="w-full h-80">

        {hasData ? (

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="#8b5cf6"
                radius={[5, 5, 0, 0]}
              />

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
