
import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import MonthlyOverview from "../components/dashboard/MonthlyOverview";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    CalendarDays,
} from "lucide-react";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Dashboard Heading */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Dashboard Overview
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Track your income and expenses at a glance.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    <SummaryCard
                        title="Total Balance"
                        amount={0}
                        icon={<Wallet size={22} />}
                        iconBgClass="bg-violet-100"
                        iconColorClass="text-violet-600"
                        description="Available balance"
                    />

                    <SummaryCard
                        title="Total Income"
                        amount={0}
                        icon={<TrendingUp size={22} />}
                        iconBgClass="bg-green-100"
                        iconColorClass="text-green-600"
                        description="Total earnings"
                    />

                    <SummaryCard
                        title="Total Expenses"
                        amount={0}
                        icon={<TrendingDown size={22} />}
                        iconBgClass="bg-red-100"
                        iconColorClass="text-red-600"
                        description="Total spending"
                    />

                    <SummaryCard
                        title="This Month Expenses"
                        amount={0}
                        icon={<CalendarDays size={22} />}
                        iconBgClass="bg-orange-100"
                        iconColorClass="text-orange-600"
                        description="Current month spending"
                    />

                </div>

                {/* Monthly Overview */}
                <MonthlyOverview />

                <CategoryBreakdown />
                <RecentTransactions />

            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
