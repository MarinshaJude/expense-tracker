
import { Link } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, ArrowRight } from "lucide-react";

interface Transaction {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

// Temporary sample transactions
const transactions: Transaction[] = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Income",
    date: "2026-11-06",
    amount: 85000,
    type: "income",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    category: "Food",
    date: "2026-11-05",
    amount: 4500,
    type: "expense",
  },
  {
    id: 3,
    title: "Bus Fare",
    category: "Transport",
    date: "2026-11-04",
    amount: 500,
    type: "expense",
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Income",
    date: "2026-11-03",
    amount: 15000,
    type: "income",
  },
  {
    id: 5,
    title: "Electricity Bill",
    category: "Bills",
    date: "2026-11-02",
    amount: 3200,
    type: "expense",
  },
];

const RecentTransactions = () => {
  const latestTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Transactions
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Your latest transactions
          </p>
        </div>

        <Link
          to="/transactions"
          className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {latestTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
          >
            {/* Transaction Details */}
            <div className="flex items-center gap-3">

              <div
                className={`p-3 rounded-full ${
                  transaction.type === "income"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowDownLeft size={18} />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-800">
                  {transaction.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {transaction.category} · {transaction.date}
                </p>
              </div>
            </div>

            {/* Transaction Amount */}
            <p
              className={`text-sm font-semibold whitespace-nowrap ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatAmount(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
