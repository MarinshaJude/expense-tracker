
import { Bell, User } from "lucide-react";

const Header = () => {
    // Get current date
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="w-full flex items-center justify-between bg-white px-8 py-5 border-b border-slate-200">

            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Hi, Welcome back!
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                    Here's what's happening with your finances.
                </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Current Date */}
                <p className="text-sm text-slate-500 hidden md:block">
                    {currentDate}
                </p>

                {/* Notification */}
                <button
                    type="button"
                    className="relative p-2 rounded-full hover:bg-slate-100 transition"
                    aria-label="Notifications"
                >
                    <Bell size={21} className="text-slate-600" />

                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full">
                    <User size={22} className="text-violet-600" />
                </div>

            </div>

        </header>
    );
};

export default Header;
