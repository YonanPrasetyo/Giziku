import { useNavigate } from "react-router-dom";

export default function ResultModal({ show, data, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white w-full max-w-md rounded-xl p-6 shadow-lg z-10">

        <h2 className="text-lg font-bold mb-4">
          Hasil Verifikasi
        </h2>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {data.map((r) => (
            <div
              key={r.id}
              className="flex justify-between border-b pb-2"
            >
              <span>{r.title}</span>

              <span
                className={`text-sm font-semibold ${
                  r.status === "approved"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {r.status === "approved" ? "Diterima" : "Ditolak"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            onClose();
            navigate("/missions");
          }}
          className="mt-5 w-full h-11 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
        >
          OK
        </button>

      </div>
    </div>
  );
}