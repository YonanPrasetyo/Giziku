import { Check, X } from "lucide-react";

export default function MissionCard({ data }) {
  const isCompleted = data.done;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">

      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full w-fit
          ${isCompleted
            ? "bg-green-50 text-green-600"
            : "bg-red-50 text-red-500"
          }`}
      >
        {isCompleted
          ? <Check size={13} strokeWidth={2.5} />
          : <X size={13} strokeWidth={2.5} />
        }
        {isCompleted ? "Selesai" : "Belum"}
      </span>

      <h3 className="font-medium text-base text-gray-900">
        {data.title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed">
        {data.description}
      </p>

      <div className="mt-auto text-sm font-medium text-green-600">
        +{data.xp} XP
      </div>

    </div>
  );
}