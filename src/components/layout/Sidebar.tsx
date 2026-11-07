
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Receipt,
    Wallet,
} from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-5">

            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-violet-600 p-2 rounded-lg">
                    <Wallet size={24} />
                </div>

                <h1 className="text-xl font-bold">
                    Expense Tracker
                </h1>
            </div>

            {/* Navigation Section */}
            <nav className="flex flex-col gap-2">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-violet-600 text-white"
                            : "text-slate-300 hover:bg-slate-800"
                        }`
                    }
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                            ? "bg-violet-600 text-white"
                            : "text-slate-300 hover:bg-slate-800"
                        }`
                    }
                >
                    <Receipt size={20} />
                    <span>Transactions</span>
                </NavLink>

            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-400">
                    Expense Tracker v1.0
                </p>
            </div>

        </aside>
    );
};

export default Sidebar;
