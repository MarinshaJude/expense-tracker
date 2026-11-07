
import type { ReactNode } from "react";

interface SummaryCardProps {
    title: string;
    amount: number;
    icon: ReactNode;
    iconBgClass: string;
    iconColorClass: string;
    description: string;
}

const SummaryCard = ({
    title,
    amount,
    icon,
    iconBgClass,
    iconColorClass,
    description,
}: SummaryCardProps) => {

    const formattedAmount = new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency: "LKR",
        maximumFractionDigits: 2,
    }).format(amount);

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">

            {/* Card Header */}
            <div className="flex items-center justify-between">

                <h3 className="text-sm font-medium text-slate-500">
                    {title}
                </h3>

                <div className={`${iconBgClass} ${iconColorClass} p-3 rounded-lg`}>
                    {icon}
                </div>

            </div>

            {/* Amount */}
            <h2 className="text-2xl font-bold text-slate-800 mt-4">
                {formattedAmount}
            </h2>

            {/* Description */}
            <p className="text-sm text-slate-400 mt-2">
                {description}
            </p>

        </div>
    );
};

export default SummaryCard;
