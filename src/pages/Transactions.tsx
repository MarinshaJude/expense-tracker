
import useTransactions from "../hooks/useTransactions";
import { Plus, Search, Filter } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import type { Transaction } from "../types/transaction";
import ConfirmDialog from "../components/common/ConfirmDialog";

const Transactions = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);
    const [transactionToDelete, setTransactionToDelete] =
        useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState<
        "all" | "income" | "expense"
    >("all");
    const {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    const handleAddTransaction = (
        newTransaction: Omit<Transaction, "id">
    ) => {
        addTransaction(newTransaction);
        setIsFormOpen(false);
    };

    const handleUpdateTransaction = (
        updatedData: Omit<Transaction, "id">
    ) => {
        if (!editingTransaction) return;

        updateTransaction(editingTransaction.id, updatedData);

        setEditingTransaction(null);
        setIsFormOpen(false);
    };
    const handleDeleteTransaction = (id: string) => {
        setTransactionToDelete(id);
    };
    const confirmDeleteTransaction = () => {
        if (!transactionToDelete) return;

        deleteTransaction(transactionToDelete);

        setTransactionToDelete(null);
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setStartDate("");
        setEndDate("");
        setSelectedCategory("");
        setSelectedType("all");
    };

    const filteredTransactions = transactions.filter((transaction) => {
        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
            transaction.title.toLowerCase().includes(search) ||
            transaction.category.toLowerCase().includes(search);

        const matchesStartDate =
            !startDate || transaction.date >= startDate;

        const matchesEndDate =
            !endDate || transaction.date <= endDate;

        const matchesCategory =
            !selectedCategory || transaction.category === selectedCategory;

        const matchesType =
            selectedType === "all" || transaction.type === selectedType;
        return (
            matchesSearch &&
            matchesStartDate &&
            matchesEndDate &&
            matchesCategory &&
            matchesType
        );
    });

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Page Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Transaction History
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Manage and track all your income and expenses.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingTransaction(null);
                            setIsFormOpen(true);
                        }} className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
                    >
                        <Plus size={18} />
                        Add Transaction
                    </button>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">

                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={18} className="text-slate-500" />
                        <h2 className="font-semibold text-slate-700">
                            Filters
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                Search
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                                />
                            </div>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                Start Date
                            </label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                End Date
                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                Category
                            </label>

                            <select
                                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Others">Others</option>

                            </select>
                        </div>


                    </div>

                    {/* Transaction Type Filter */}
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Transaction Type
                        </label>

                        <div className="flex flex-wrap gap-2">
                            <button
                                className={`px-4 py-2 rounded-lg text-sm ${selectedType === "all"
                                    ? "bg-violet-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                onClick={() => setSelectedType("all")}
                            >
                                All
                            </button>

                            <button
                                className={`px-4 py-2 rounded-lg text-sm ${selectedType === "income"
                                    ? "bg-violet-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                onClick={() => setSelectedType("income")}
                            >
                                Income
                            </button>

                            <button
                                className={`px-4 py-2 rounded-lg text-sm ${selectedType === "expense"
                                    ? "bg-violet-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                onClick={() => setSelectedType("expense")}
                            >
                                Expense
                            </button>
                        </div>
                    </div>
                    {/* Clear Filters */}
                    <div className="flex justify-end mt-5 pt-4 border-t border-slate-100">
                        <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg transition"
                        >
                            Clear Filters
                        </button>
                    </div>

                </div>

                {/* Transaction Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800">
                            All Transactions
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            View and manage your transaction history.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                                        Date
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                                        Description
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                                        Category
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase text-right">
                                        Amount
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {filteredTransactions.length === 0 ? (<tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-12 text-center text-sm text-slate-400"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                                ) : (
                                    [...filteredTransactions]
                                        .sort(
                                            (a, b) =>
                                                new Date(b.date).getTime() -
                                                new Date(a.date).getTime()
                                        )
                                        .map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="hover:bg-slate-50 transition"
                                            >
                                                {/* Date */}
                                                <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                                                    {new Date(
                                                        transaction.date + "T00:00:00"
                                                    ).toLocaleDateString("en-GB")}
                                                </td>

                                                {/* Description */}
                                                <td className="px-5 py-4 text-sm font-medium text-slate-800">
                                                    {transaction.title}
                                                </td>

                                                {/* Category */}
                                                <td className="px-5 py-4 text-sm text-slate-600">
                                                    {transaction.category}
                                                </td>

                                                {/* Type */}
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.type === "income"
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-red-50 text-red-600"
                                                            }`}
                                                    >
                                                        {transaction.type === "income"
                                                            ? "Income"
                                                            : "Expense"}
                                                    </span>
                                                </td>

                                                {/* Amount */}
                                                <td
                                                    className={`px-5 py-4 text-sm font-semibold text-right whitespace-nowrap ${transaction.type === "income"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                        }`}
                                                >
                                                    {transaction.type === "income" ? "+" : "-"}
                                                    {new Intl.NumberFormat("en-LK", {
                                                        style: "currency",
                                                        currency: "LKR",
                                                        maximumFractionDigits: 2,
                                                    }).format(transaction.amount)}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        onClick={() => {
                                                            setEditingTransaction(transaction);
                                                            setIsFormOpen(true);
                                                        }}
                                                        className="px-3 py-1.5 text-sm text-violet-600 hover:bg-violet-50 rounded-lg transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTransaction(transaction.id)}
                                                        className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                )}

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
            <TransactionForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingTransaction(null);
                }}
                onSubmit={
                    editingTransaction
                        ? handleUpdateTransaction
                        : handleAddTransaction
                }
                initialData={editingTransaction}
            />
            <ConfirmDialog
                isOpen={transactionToDelete !== null}
                title="Delete Transaction?"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                onCancel={() => setTransactionToDelete(null)}
                onConfirm={confirmDeleteTransaction}
            />
        </DashboardLayout>
    );
};

export default Transactions;
