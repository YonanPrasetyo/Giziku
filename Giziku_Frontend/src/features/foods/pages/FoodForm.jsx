import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFood, updateFood, getFoodById } from "../services/foodService";

export default function FoodForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    portionSize: "",
    calories: "",
    protein: "",
    sugar: "",
    carbohydrates: "",
    fat: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    const fetchFood = async () => {
      if (!isEdit) return;
      try {
        setLoading(true);
        const data = await getFoodById(id);
        setForm({
          name: data.name,
          category: data.category,
          portionSize: data.portionSize,
          calories: data.calories,
          protein: data.protein,
          sugar: data.sugar,
          carbohydrates: data.carbohydrates,
          fat: data.fat,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
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
        await updateFood(id, form);
      } else {
        await createFood(form);
      }
      navigate("/admin/foods");
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
              {isEdit ? "Edit Food" : "Tambah Food"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama Food"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Kategori"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="portionSize"
                value={form.portionSize}
                onChange={handleChange}
                placeholder="Ukuran Porsi"
                className="w-full border p-3 rounded-lg"
                required
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <input
                  type="number"
                  name="carbohydrates"
                  value={form.carbohydrates}
                  onChange={handleChange}
                  placeholder="Karbohidrat"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="fat"
                  value={form.fat}
                  onChange={handleChange}
                  placeholder="Lemak"
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
