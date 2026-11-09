import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Transaction } from "../../types/transaction";


interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (transaction: Omit<Transaction, "id">) => void;
    initialData?: Transaction | null;
}

const TransactionForm = ({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
}: TransactionFormProps) => {

    const [type, setType] = useState<"income" | "expense">("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState<{
        amount?: string;
        category?: string;
        title?: string;
        date?: string;
    }>({});

    useEffect(() => {
    if (initialData) {
        setType(initialData.type);
        setAmount(String(initialData.amount));
        setCategory(initialData.category);
        setTitle(initialData.title);
        setDate(initialData.date);
    } else {
        setType("expense");
        setAmount("");
        setCategory("");
        setTitle("");
        setDate("");
    }

    setErrors({});
}, [initialData, isOpen]);


    const handleSubmit = () => {
        const numericAmount = Number(amount);

        const validationErrors: {
            amount?: string;
            category?: string;
            title?: string;
            date?: string;
        } = {};

        if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
            validationErrors.amount = "Please enter a valid amount.";
        }

        if (!category) {
            validationErrors.category = "Please select a category.";
        }

        if (!title.trim()) {
            validationErrors.title = "Please enter a description.";
        }

        if (!date) {
            validationErrors.date = "Please select a date.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            type,
            amount: numericAmount,
            category,
            title: title.trim(),
            date,
        });

        setType("expense");
        setAmount("");
        setCategory("");
        setTitle("");
        setDate("");
        setErrors({});
    };
    // Don't display the modal when it is closed
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            {/* Modal Container */}
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">

                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-200">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {initialData ? "Edit Transaction" : "Add Transaction"}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Enter your transaction details below.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Fields */}
                <div className="p-5 space-y-5">

                    {/* Transaction Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Transaction Type
                        </label>

                        <div className="grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={() => {
    setType("income");
    setCategory("");
    setErrors((prev) => ({ ...prev, category: undefined }));
}}
                                className={`py-2.5 rounded-lg text-sm font-medium border ${type === "income"
                                    ? "bg-green-50 border-green-500 text-green-600"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                Income
                            </button>

                            <button
                                type="button"
                                onClick={() => {
    setType("expense");
    setCategory("");
    setErrors((prev) => ({ ...prev, category: undefined }));
}}
                                className={`py-2.5 rounded-lg text-sm font-medium border ${type === "expense"
                                    ? "bg-red-50 border-red-500 text-red-600"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                Expense
                            </button>

                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Amount (LKR)
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.amount}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                        >
                            <option value="">Select category</option>
                            {type === "income" ? (
                                <>
                                    <option value="Salary">Salary</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Business">Business</option>
                                    <option value="Investment">Investment</option>
                                    <option value="Others">Others</option>
                                </>
                            ) : (
                                <>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Others">Others</option>
                                </>
                            )}
                        </select>
                        {errors.category && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter transaction description"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                        />
                        {errors.date && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.date}
                            </p>
                        )}
                    </div>

                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 p-5 border-t border-slate-200">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700"
                    >
                        {initialData ? "Update Transaction" : "Save Transaction"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default TransactionForm;