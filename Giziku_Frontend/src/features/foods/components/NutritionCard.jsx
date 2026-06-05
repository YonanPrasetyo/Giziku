import { format2, percentOf, toNumber } from "../../../shared/utils/format";

export default function NutritionCard({ label, value, max, color, unit }) {
  const numValue = toNumber(value);
  const numMax = toNumber(max);
  const hasStandard = numMax > 0;
  const percent = hasStandard ? percentOf(numValue, numMax) : 0;

  const colorMap = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{label}</h3>
        <span className="font-extrabold">
          {format2(numValue)} {unit}
        </span>
      </div>

      {hasStandard && (
        <>
          <div className="text-sm text-gray-500 mt-1">
            {format2(percent)}% dari kebutuhan
          </div>

          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div
              className={`${colorMap[color]} h-2 rounded`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}