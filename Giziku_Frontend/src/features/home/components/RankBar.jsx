export default function RankBar({ rank, xp }) {
  if (!rank) return null;

  const progress =
    ((xp - rank.min_xp) / (rank.max_xp - rank.min_xp)) * 100;

  return (
    <div className="bg-white rounded-xl border p-5 flex items-center gap-4 shadow-sm">

      <img
        src={rank.icon_url}
        alt={rank.name}
        className="w-14 h-14 object-contain"
      />

      <div className="flex-1">
        <p className="text-sm text-gray-500">Rank Kamu</p>
        <h2 className="font-bold text-lg capitalize">{rank.name}</h2>

        <div className="mt-2">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {xp} / {rank.max_xp} XP
          </p>
        </div>
      </div>
    </div>
  );
}