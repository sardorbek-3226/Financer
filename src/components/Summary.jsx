export default function Summary({ transactions }) {
  const income = transactions
    .filter(tx => tx.type === "income")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const expense = transactions
    .filter(tx => tx.type === "expense")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const balance = income - expense;

  const cards = [
    { title: "Balans", value: balance, gradient: "from-green-400 to-green-600" },
    { title: "Kirim", value: income, gradient: "from-blue-400 to-blue-600" },
    { title: "Chiqim", value: expense, gradient: "from-red-400 to-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className={`p-5 rounded-xl shadow-lg text-white bg-gradient-to-r ${card.gradient} hover:scale-105 transition`}>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold mt-2">{card.value.toFixed(2)} So'm</p>
        </div>
      ))}
    </div>
  );
}
