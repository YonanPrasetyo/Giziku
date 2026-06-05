import { format2 } from "../../../shared/utils/format";

export default function MealCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border p-4 space-y-3">

      <div className="flex justify-between items-center">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          {new Date(data.created_at).toLocaleTimeString()}
        </span>
        <span className="text-sm font-bold text-green-600">
          {format2(data.calories)} kkal
        </span>
      </div>

      <h3 className="font-extrabold">{data.name}</h3>

      <div className="grid grid-cols-4 text-center text-xs">
        <div>
          <p className="font-bold text-blue-500">{format2(data.protein)}g</p>
          <p className="text-gray-400">Protein</p>
        </div>
        <div>
          <p className="font-bold text-yellow-500">{format2(data.carbohydrates)}g</p>
          <p className="text-gray-400">Karbo</p>
        </div>
        <div>
            <p className="font-bold text-red-500">{format2(data.sugar)}g</p>
            <p className="text-gray-400">Gula</p>
        </div>
        <div>
          <p className="font-bold text-purple-500">{format2(data.fat)}g</p>
          <p className="text-gray-400">Lemak</p>
        </div>
      </div>

    </div>
  );
}