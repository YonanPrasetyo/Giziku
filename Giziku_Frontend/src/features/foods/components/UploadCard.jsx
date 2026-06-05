export default function UploadCard({ image, setImage, preview, setPreview }) {
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Foto Makanan</h2>
        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">1</span>
      </div>

      {!preview ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-60 cursor-pointer hover:bg-gray-50">
          <span className="text-gray-500 text-sm">Klik untuk upload</span>
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </label>
      ) : (
        <div className="relative">
          <img
            src={preview}
            className="w-full h-60 object-cover rounded-xl"
          />

          <button
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
            className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-xs shadow"
          >
            Hapus
          </button>
        </div>
      )}

      {image && (
        <p className="text-xs text-gray-500">
          {image.name}
        </p>
      )}

    </div>
  );
}