
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import useTransactions from "../../hooks/useTransactions";

interface CategoryBreakdownProps {
  selectedMonth: string;
  selectedYear: string;
}

const COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#f97316",
  "#10b981",
  "#ec4899",
  "#64748b",
];

const CategoryBreakdown = ({
  selectedMonth,
  selectedYear,
}: CategoryBreakdownProps) => {

  const { transactions } = useTransactions();

  // Filter expenses based on selected month and year
  const monthlyExpenses = transactions.filter((transaction) => {
    return (
      transaction.type === "expense" &&
      transaction.date.slice(0, 4) === selectedYear &&
      transaction.date.slice(5, 7) === selectedMonth
    );
  });

  // Calculate category-wise expense totals
  const categoryTotals = monthlyExpenses.reduce<
    { name: string; value: number }[]
  >((totals, transaction) => {

    const existingCategory = totals.find(
      (item) => item.name === transaction.category
    );

    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      totals.push({
        name: transaction.category,
        value: transaction.amount,
      });
    }

    return totals;
  }, []);

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

        {categoryTotals.length > 0 ? (

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={categoryTotals}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={3}
              >
                {categoryTotals.map((entry, index) => (
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

        ) : (

          <p className="text-center text-sm text-slate-400 pt-20">
            No expense data available for the selected month.
          </p>

        )}

      </div>

    </div>
  );
};

export default CategoryBreakdown;
