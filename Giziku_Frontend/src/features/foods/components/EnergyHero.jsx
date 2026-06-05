import { format2, percentOf, toNumber } from "../../../shared/utils/format";

export default function EnergyHero({ data, standard }) {
  const calories = toNumber(data?.calories);
  const standardCalories = toNumber(standard?.calories);
  const percent = standardCalories > 0 ? percentOf(calories, standardCalories) : 0;

  return (
    <div className="bg-white rounded-2xl border p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">Energi</h2>
        <span className="text-2xl font-extrabold text-orange-500">
          {format2(calories)} kkal
        </span>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {standardCalories > 0
          ? `${format2(percent)}% dari kebutuhan harian`
          : "Data kebutuhan harian tidak tersedia"}
      </div>

      <div className="w-full bg-gray-200 h-2 rounded mt-2">
        <div
          className="bg-orange-500 h-2 rounded"
          style={{ width: `${standardCalories > 0 ? percent : 0}%` }}
        />
      </div>
    </div>
  );
}