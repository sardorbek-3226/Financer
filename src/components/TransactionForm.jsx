import { useState } from "react";

export default function TransactionForm({ addTransaction }) {
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) return;
    addTransaction({ type, category, amount });
    setCategory("");
    setAmount("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-gradient-to-r from-purple-200 to-pink-200 p-6 rounded-xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
        Yangi Harakat Qo‘shish
      </h2>

      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-gray-800 font-medium"
      >
        <option value="income">Kirim</option>
        <option value="expense">Chiqim</option>
      </select>

      <input
        type="text"
        placeholder="Kategoriya"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-gray-800 font-medium"
      />

      <input
        type="number"
        placeholder="Miqdor"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-gray-800 font-medium"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-4 py-3 rounded-lg hover:scale-105 transition shadow-lg"
      >
        Qo‘shish
      </button>
    </form>
  );
}
