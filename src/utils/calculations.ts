import type { Transaction } from "../types/transaction";

export const calculateSummary = (transactions: Transaction[]) => {

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    const today = new Date();

    const currentMonth = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}`;

    const thisMonthExpenses = transactions
        .filter(
            (transaction) =>
                transaction.type === "expense" &&
                transaction.date.startsWith(currentMonth)
        )
        .reduce((total, transaction) => total + transaction.amount, 0);

    return {
        totalBalance,
        totalIncome,
        totalExpenses,
        thisMonthExpenses,
    };
};