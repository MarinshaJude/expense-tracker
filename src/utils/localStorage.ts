import type { Transaction } from "../types/transaction";

const STORAGE_KEY = "expense-tracker-transactions";

// Get transactions from LocalStorage
export const getTransactionsFromStorage = (): Transaction[] => {
    try {
        const storedTransactions = localStorage.getItem(STORAGE_KEY);

        return storedTransactions
            ? JSON.parse(storedTransactions)
            : [];
    } catch (error) {
        console.error("Error loading transactions:", error);
        return [];
    }
};

// Save transactions to LocalStorage
export const saveTransactionsToStorage = (
    transactions: Transaction[]
): void => {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(transactions)
        );
    } catch (error) {
        console.error("Error saving transactions:", error);
    }
};