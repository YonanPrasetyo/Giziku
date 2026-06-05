export default function DailyContribution({ result, standard }) {
  const percent = (result.calories / standard.calories) * 100;

  return (
    <div className="bg-white rounded-2xl border p-4">
      <h2 className="font-bold mb-3">Kontribusi Harian</h2>

      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm mt-2">{percent.toFixed(1)}%</p>
    </div>
  );
}   