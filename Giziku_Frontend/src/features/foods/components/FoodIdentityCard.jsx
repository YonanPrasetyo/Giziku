export default function FoodIdentityCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">

      <div className="w-full h-48 md:h-56 bg-gray-100 flex items-center justify-center">
        {data.image_url && data.image_url !== "-" ? (
          <img
            src={data.image_url}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-500">
            <div className="mb-2 text-3xl">🍽️</div>
            <p className="text-sm">Tidak ada gambar untuk hasil ini</p>
          </div>
        )}
      </div>

      <div className="bg-green-500 text-white p-4 flex gap-4">
        <div>
          <p className="text-xs opacity-80">Makanan Terdeteksi</p>
          <h1 className="text-xl font-extrabold">{data.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 text-center text-sm border-t">
        <div className="p-2">
          <p className="text-gray-400">Porsi</p>
          <p className="font-bold">1</p>
        </div>
        <div className="p-2">
          <p className="text-gray-400">Untuk</p>
          <p className="font-bold">{data.profile_name}</p>
        </div>
        <div className="p-2">
          <p className="text-gray-400">Tanggal</p>
          <p className="font-bold">
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>
        <div className="p-2">
          <p className="text-gray-400">Waktu</p>
          <p className="font-bold">
            {new Date(data.date).toLocaleTimeString()}
          </p>
        </div>
      </div>

    </div>
  );
}