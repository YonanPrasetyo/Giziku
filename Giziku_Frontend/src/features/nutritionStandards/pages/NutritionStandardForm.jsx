import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNutritionStandard,
  updateNutritionStandard,
  getNutritionStandardById,
} from "../services/nutritionStandardService";

export default function NutritionStandardForm() {
  const [form, setForm] = useState({
    ageMin: "",
    ageMax: "",
    gender: "",
    calories: "",
    protein: "",
    sugar: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    const fetchStandard = async () => {
      if (!isEdit) return;

      try {
        setLoading(true);
        const data = await getNutritionStandardById(id);
        setForm({
          ageMin: data.ageMin,
          ageMax: data.ageMax,
          gender: data.gender,
          calories: data.calories,
          protein: data.protein,
          sugar: data.sugar,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandard();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateNutritionStandard(id, form);
      } else {
        await createNutritionStandard(form);
      }
      navigate("/admin/nutrition-standards");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-6">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit Standar Gizi" : "Tambah Standar Gizi"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="number"
                  name="ageMin"
                  value={form.ageMin}
                  onChange={handleChange}
                  placeholder="Usia Min"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="ageMax"
                  value={form.ageMax}
                  onChange={handleChange}
                  placeholder="Usia Max"
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                >
                  <option value="">Pilih gender</option>
                  <option value="M">Laki-laki</option>
                  <option value="F">Perempuan</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <input
                  type="number"
                  name="calories"
                  value={form.calories}
                  onChange={handleChange}
                  placeholder="Kalori"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="protein"
                  value={form.protein}
                  onChange={handleChange}
                  placeholder="Protein"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="sugar"
                  value={form.sugar}
                  onChange={handleChange}
                  placeholder="Gula"
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>

              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
