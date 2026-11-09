
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <BrowserRouter>
     <TransactionProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </TransactionProvider>
    </BrowserRouter>
  );
}

export default App;
