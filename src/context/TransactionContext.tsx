
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { Transaction } from "../types/transaction";

import {
    getTransactionsFromStorage,
    saveTransactionsToStorage,
} from "../utils/localStorage";

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (data: Omit<Transaction, "id">) => void;
    updateTransaction: (
        id: string,
        data: Omit<Transaction, "id">
    ) => void;
    deleteTransaction: (id: string) => void;
}

const TransactionContext = createContext<
    TransactionContextType | undefined
>(undefined);

interface TransactionProviderProps {
    children: ReactNode;
}

export const TransactionProvider = ({
    children,
}: TransactionProviderProps) => {

    const [transactions, setTransactions] = useState<Transaction[]>(
        getTransactionsFromStorage
    );

    useEffect(() => {
        saveTransactionsToStorage(transactions);
    }, [transactions]);

    const addTransaction = (
        newTransaction: Omit<Transaction, "id">
    ) => {
        const transaction: Transaction = {
            ...newTransaction,
            id: crypto.randomUUID(),
        };

        setTransactions((prev) => [...prev, transaction]);
    };

    const updateTransaction = (
        id: string,
        updatedData: Omit<Transaction, "id">
    ) => {
        setTransactions((prev) =>
            prev.map((transaction) =>
                transaction.id === id
                    ? { ...updatedData, id }
                    : transaction
            )
        );
    };

    const deleteTransaction = (id: string) => {
        setTransactions((prev) =>
            prev.filter((transaction) => transaction.id !== id)
        );
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                addTransaction,
                updateTransaction,
                deleteTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

const useTransactions = () => {
    const context = useContext(TransactionContext);

    if (!context) {
        throw new Error(
            "useTransactions must be used within TransactionProvider"
        );
    }

    return context;
};

export default useTransactions;
