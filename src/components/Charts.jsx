import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
);

// Format helper: vergul bilan, ming va million
const formatAmount = (num) => {
  if (num >= 1000000) return (num / 1000000).toLocaleString('uz-UZ', { maximumFractionDigits: 2 }) + " mln";
  if (num >= 1000) return (num / 1000).toLocaleString('uz-UZ', { maximumFractionDigits: 2 }) + " ming";
  return num.toLocaleString('uz-UZ');
};

export default function Charts({ transactions }) {
  const dates = transactions.map(t => new Date(t.date).toLocaleDateString('uz-UZ'));

  // Balans o'zgarishi
  const balances = transactions.map((t, i) => {
    let total = 0;
    for (let j = 0; j <= i; j++) {
      total += transactions[j].type === "income"
        ? Number(transactions[j].amount)
        : -Number(transactions[j].amount);
    }
    return total;
  });

  // Kategoriya bo'yicha sarf
  const catData = {};
  transactions.forEach(t => {
    if (!catData[t.category]) catData[t.category] = 0;
    catData[t.category] += Number(t.amount);
  });

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Balans",
        data: balances,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.3)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#16a34a",
        pointBorderColor: "#16a34a",
        pointHoverRadius: 6
      }
    ]
  };

  const doughnutData = {
    labels: Object.keys(catData),
    datasets: [
      {
        data: Object.values(catData),
        backgroundColor: ["#60A5FA","#F87171","#FBBF24","#34D399","#A78BFA","#F472B6"],
        hoverOffset: 10
      }
    ]
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* Balans Line Chart */}
      <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-3 text-green-800">Balans o‘zgarishi</h3>
        <Line
          data={lineData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top', labels: { color: '#065f46', font: { size: 14 } } },
              tooltip: {
                callbacks: {
                  label: (context) => `Balans: ${formatAmount(context.raw)} so‘m`
                }
              }
            },
            scales: {
              y: { 
                ticks: { color: '#065f46', callback: val => formatAmount(val) }, 
                beginAtZero: true 
              },
              x: { ticks: { color: '#065f46' } }
            }
          }}
        />
      </div>

      {/* Kategoriya Doughnut Chart */}
      <div className="bg-gradient-to-br from-pink-100 via-pink-200 to-red-100 p-5 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-3 text-red-700">Kategoriya bo‘yicha sarflanish</h3>
        <Doughnut
          data={doughnutData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'bottom', labels: { color:'#991b1b', font: { size:14 } } },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${formatAmount(context.raw)} so‘m`
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
