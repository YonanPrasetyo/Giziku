import { useNavigate } from "react-router-dom";

export default function ProfileMissionCard({ item }) {
  const navigate = useNavigate();

  const total = item.missions.length;
  const done = item.missions.filter((m) => m.done).length;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">
          {item.profile.name}
        </h2>

        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold">
          {done}/{total} selesai
        </span>
      </div>

      <div className="space-y-2">
        {item.missions.map((m) => (
          <div
            key={m.id}
            className={`text-sm px-3 py-2 rounded-lg border flex justify-between ${
              m.done
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            <span>{m.title}</span>

            {m.done && (
              <span className="text-xs font-semibold">
                ✔
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}