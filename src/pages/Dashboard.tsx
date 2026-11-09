
import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import MonthlyOverview from "../components/dashboard/MonthlyOverview";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import useTransactions from "../hooks/useTransactions";
import { calculateSummary } from "../utils/calculations";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    CalendarDays,
    Plus,
} from "lucide-react";

import { useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import type { Transaction } from "../types/transaction";


const Dashboard = () => {
    const currentDate = new Date();

    const [selectedMonth, setSelectedMonth] = useState(
        String(currentDate.getMonth() + 1).padStart(2, "0")
    );

    const [selectedYear, setSelectedYear] = useState(
        String(currentDate.getFullYear())
    );

    const [isFormOpen, setIsFormOpen] = useState(false);

    const { transactions, addTransaction } = useTransactions();

    const handleAddTransaction = (
        transaction: Omit<Transaction, "id">
    ) => {
        addTransaction(transaction);
        setIsFormOpen(false);
    };

    const {
        totalBalance,
        totalIncome,
        totalExpenses,
        thisMonthExpenses,
    } = calculateSummary(transactions);

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Dashboard Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Dashboard Overview
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Track your income and expenses at a glance.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition"
                    >
                        <Plus size={18} />
                        Add Transaction
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    <SummaryCard
                        title="Total Balance"
                        amount={totalBalance}
                        icon={<Wallet size={22} />}
                        iconBgClass="bg-violet-100"
                        iconColorClass="text-violet-600"
                        description="Available balance"
                    />

                    <SummaryCard
                        title="Total Income"
                        amount={totalIncome}
                        icon={<TrendingUp size={22} />}
                        iconBgClass="bg-green-100"
                        iconColorClass="text-green-600"
                        description="Total earnings"
                    />

                    <SummaryCard
                        title="Total Expenses"
                        amount={totalExpenses}
                        icon={<TrendingDown size={22} />}
                        iconBgClass="bg-red-100"
                        iconColorClass="text-red-600"
                        description="Total spending"
                    />

                    <SummaryCard
                        title="This Month Expenses"
                        amount={thisMonthExpenses}
                        icon={<CalendarDays size={22} />}
                        iconBgClass="bg-orange-100"
                        iconColorClass="text-orange-600"
                        description="Current month spending"
                    />

                </div>

                <MonthlyOverview
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    setSelectedMonth={setSelectedMonth}
                    setSelectedYear={setSelectedYear}
                />

                <CategoryBreakdown
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                />
                <RecentTransactions />

            </div>

            <TransactionForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleAddTransaction}
            />

        </DashboardLayout>
    );
};

export default Dashboard;
