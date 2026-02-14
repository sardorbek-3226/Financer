export default function FilterTabs({ filter, setFilter }) {
    return (
      <div className="flex gap-4 mb-6">
        {["weekly","monthly","yearly"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter===f ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    );
  }
  