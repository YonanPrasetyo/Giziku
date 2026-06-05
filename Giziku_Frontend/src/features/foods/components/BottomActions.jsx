import { useNavigate } from "react-router-dom";

export default function BottomActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-t p-4">
      <button
        onClick={() => navigate("/")}
        className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}