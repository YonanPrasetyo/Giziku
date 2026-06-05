import { format2 } from "../../../shared/utils/format";

export default function HistoryItem({ data }) {
  return (
    <div className="bg-white rounded-2xl border p-4 flex justify-between items-center">

      <div>
        <h3 className="font-bold">{data.name}</h3>
        <p className="text-xs text-gray-500">
          {new Date(data.date).toLocaleTimeString()}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-green-600">
          {format2(data.calories)} kkal
        </p>

        <div className="text-xs text-gray-400">
          P: {format2(data.protein)}g ·
          K: {format2(data.carbohydrates)}g ·
          L: {format2(data.fat)}g
        </div>
      </div>

    </div>
  );
}