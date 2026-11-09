import useTransactionContext from "../context/TransactionContext";

const useTransactions = () => {
    return useTransactionContext();
};

export default useTransactions;