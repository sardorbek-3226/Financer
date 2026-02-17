import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [dailySummary, setDailySummary] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [yearlySummary, setYearlySummary] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;
    setUser(currentUser);

    const savedTx =
      JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`)) || [];
    setTransactions(savedTx);

    // Summaries
    generateSummaries(savedTx);
  }, []);

  const generateSummaries = (txList) => {
    const daily = {};
    const monthly = {};
    const yearly = {};
  
    txList.forEach((tx) => {
      const dateObj = new Date(tx.date);
  
      const dayKey = dateObj.toISOString().split("T")[0]; 
      const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
      const yearKey = `${dateObj.getFullYear()}`;
  
      // DAILY
      if (!daily[dayKey]) daily[dayKey] = { income: 0, expense: 0 };
      if (tx.type === "income") daily[dayKey].income += Number(tx.amount);
      else daily[dayKey].expense += Number(tx.amount);
  
      // MONTHLY
      if (!monthly[monthKey]) monthly[monthKey] = { income: 0, expense: 0 };
      if (tx.type === "income") monthly[monthKey].income += Number(tx.amount);
      else monthly[monthKey].expense += Number(tx.amount);
  
      // YEARLY
      if (!yearly[yearKey]) yearly[yearKey] = { income: 0, expense: 0 };
      if (tx.type === "income") yearly[yearKey].income += Number(tx.amount);
      else yearly[yearKey].expense += Number(tx.amount);
    });
  
    // 🔥 SORT QILIB ARRAYGA O‘TKAZAMIZ
  
    setDailySummary(
      Object.entries(daily)
        .map(([date, val]) => ({
          date,
          ...val,
          balance: val.income - val.expense,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // YANGI SANA TEPADA
    );
  
    setMonthlySummary(
      Object.entries(monthly)
        .map(([month, val]) => ({
          month,
          ...val,
          balance: val.income - val.expense,
        }))
        .sort((a, b) => new Date(b.month) - new Date(a.month))
    );
  
    setYearlySummary(
      Object.entries(yearly)
        .map(([year, val]) => ({
          year,
          ...val,
          balance: val.income - val.expense,
        }))
        .sort((a, b) => b.year - a.year)
    );
  };
  

  const renderTable = (title, data, keyLabel) => (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-3 border-b">{keyLabel}</th>
            <th className="py-2 px-3 border-b">Kirim</th>
            <th className="py-2 px-3 border-b">Chiqim</th>
            <th className="py-2 px-3 border-b">Qoldiq</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-2">
                Ma'lumot yo‘q
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx}>
                <td className="py-2 px-3 border-b">{item.date || item.month || item.year}</td>
                <td className="py-2 px-3 border-b text-green-600 font-semibold">
                  {item.income.toLocaleString()} so‘m
                </td>
                <td className="py-2 px-3 border-b text-red-600 font-semibold">
                  {item.expense.toLocaleString()} so‘m
                </td>
                <td className="py-2 px-3 border-b font-semibold">{item.balance.toLocaleString()} so‘m</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Hisobotlar</h1>

        {renderTable("Kunlik hisobot", dailySummary, "Sana")}
        {renderTable("Oylik hisobot", monthlySummary, "Oy")}
        {renderTable("Yillik hisobot", yearlySummary, "Yil")}
      </div>
    </div>
  );
}
