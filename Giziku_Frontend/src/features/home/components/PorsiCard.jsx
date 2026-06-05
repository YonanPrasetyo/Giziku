export default function PorsiCard() {
  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition">
      
      <div className="flex justify-between p-3 border-b">
        <div className="flex gap-2 items-center">
          <span className="text-xs bg-orange-100 text-orange-600 px-2 rounded-full">
            Sarapan
          </span>
          <span className="text-xs text-gray-400">07.15</span>
        </div>

        <span className="text-xs bg-green-100 text-green-600 px-2 rounded-full font-bold">
          425 kkal
        </span>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-sm sm:text-base">
          Nasi Goreng
        </h3>

        <p className="text-xs text-gray-400 mb-2">
          1 porsi
        </p>

        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          <div className="bg-gray-100 p-2 rounded">425</div>
          <div className="bg-gray-100 p-2 rounded">14g</div>
          <div className="bg-gray-100 p-2 rounded">62g</div>
          <div className="bg-gray-100 p-2 rounded">16g</div>
        </div>
      </div>
    </div>
  );
}