import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import FilterTabs from "../components/FilterTabs";

export default function AppPage() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("weekly"); // default weekly

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;
    setUser(currentUser);

    const savedTx =
      JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`)) || [];
    setTransactions(savedTx);
  }, []);

  const addTransaction = (tx) => {
    const newTx = { id: Date.now(), ...tx, date: new Date().toISOString() };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem(`transactions_${user.email}`, JSON.stringify(updated));
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((tx) => tx.id !== id);
    setTransactions(updated);
    localStorage.setItem(`transactions_${user.email}`, JSON.stringify(updated));
  };

  // Filterlangan transactions
  const now = new Date();
  const filteredTx = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    if (filter === "weekly") return (now - txDate) / (1000 * 60 * 60 * 24) <= 7;
    if (filter === "monthly")
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    if (filter === "yearly") return txDate.getFullYear() === now.getFullYear();
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <Navbar />

      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">Dashboard</h1>

        {/* Filter tabs */}
        <FilterTabs filter={filter} setFilter={setFilter} />

        {/* Summary Cards */}
        <Summary transactions={filteredTx} />

        {/* Transaction Form + List */}
        <div className="grid md:grid-cols-2 gap-6">
          <TransactionForm addTransaction={addTransaction} />
          <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
        </div>
      </div>
    </div>
  );
}
