import React from "react";

export default function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Tranzaksiyalar</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-3 border-b">Sana</th>
            <th className="py-2 px-3 border-b">Kategoriya</th>
            <th className="py-2 px-3 border-b">Turi</th>
            <th className="py-2 px-3 border-b">Miqdor</th>
            <th className="py-2 px-3 border-b">Harakat</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="hover:bg-gray-100 transition">
              <td className="py-2 px-3">{new Date(tx.date).toLocaleDateString('uz-UZ')}</td>
              <td className="py-2 px-3">{tx.category}</td>
              <td className={`py-2 px-3 font-semibold ${tx.type==='income'?'text-green-600':'text-red-600'}`}>
                {tx.type==='income'?'Kirim':'Chiqim'}
              </td>
              <td className={`py-2 px-3 font-bold ${tx.type==='income'?'text-green-600':'text-red-600'}`}>
                {tx.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
              </td>
              <td className="py-2 px-3">
                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
