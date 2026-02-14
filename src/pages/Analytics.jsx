import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import FilterTabs from "../components/FilterTabs";
import { useState, useEffect } from "react";

export default function Analytics() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("weekly");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;
    setUser(currentUser);

    const savedTx =
      JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`)) || [];
    setTransactions(savedTx);
  }, []);

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
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Analitika</h1>
        <FilterTabs filter={filter} setFilter={setFilter} />
        <Charts transactions={filteredTx} />
      </div>
    </div>
  );
}
