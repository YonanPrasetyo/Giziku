export default function ProfileSelectCard({
  profiles,
  selectedProfile,
  setSelectedProfile,
}) {
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Untuk Siapa?</h2>
        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">2</span>
      </div>

      <select
        value={selectedProfile}
        onChange={(e) => setSelectedProfile(e.target.value)}
        className="w-full h-12 border rounded-lg px-3"
      >
        <option value="">-- Pilih Profile --</option>
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProfile(p.id)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedProfile == p.id
                ? "bg-green-100 text-green-600 border-green-500"
                : "bg-gray-100"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

    </div>
  );
}