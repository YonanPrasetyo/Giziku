import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNutritionStandards, deleteNutritionStandard } from "../services/nutritionStandardService";

export default function AdminNutritionStandards() {
  const [standards, setStandards] = useState([]);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const navigate = useNavigate();

  const fetchStandards = async () => {
    try {
      const data = await getNutritionStandards();
      setStandards(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus standar gizi?")) return;

    try {
      await deleteNutritionStandard(id);
      fetchStandards();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold">Standar Gizi</h1>
                <p className="text-sm text-gray-500">Kelola standar gizi berdasarkan usia dan gender.</p>
              </div>

              <button
                onClick={() => navigate("/admin/nutrition-standards/create")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                + Tambah Standar
              </button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {standards.length === 0 ? (
                <div className="p-5 text-center text-gray-500">Tidak ada data standar gizi</div>
              ) : (
                standards.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[1fr_auto] border-b last:border-b-0">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">Usia {item.age_min} - {item.age_max} tahun</p>
                      <p className="text-sm text-gray-600">Gender: {item.gender}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                        <span>Kalori: {item.calories}</span>
                        <span>Protein: {item.protein}</span>
                        <span>Gula: {item.sugar}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                      <button
                        onClick={() => navigate(`/admin/nutrition-standards/edit/${item.id}`)}
                        className="px-3 py-2 text-sm bg-yellow-400 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-2 text-sm bg-red-500 text-white rounded-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
