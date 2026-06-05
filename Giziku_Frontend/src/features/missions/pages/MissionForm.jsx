import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import {
  createMission,
  updateMission,
  getMissionById,
} from "../services/missionService";
import { getFoods } from "../../foods/services/foodService";

export default function MissionForm() {
  const [form, setForm] = useState({
    food_id: "",
    description: "",
    xp: "",
  });
  const [foods, setFoods] = useState([]);
  const [foodSearch, setFoodSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const selectedFood = foods.find((food) => food.id === form.food_id);
  const selectedFoodName = selectedFood?.name || "";

  useEffect(() => {
    const fetchDetail = async () => {
      if (!isEdit) return;

      try {
        setLoading(true);

        const data = await getMissionById(id);

        setForm({
          food_id: data.data.food_id || data.data.foodId || data.data.food?.id || "",
          description: data.data.description,
          xp: data.data.xp,
        });
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, isEdit]);

  useEffect(() => {
    const fetchFoodsData = async () => {
      try {
        const items = await getFoods(foodSearch.trim());
        setFoods(items || []);
      } catch (err) {
        console.error("Gagal ambil data food:", err);
      }
    };

    const timer = setTimeout(() => {
      fetchFoodsData();
    }, 300);

    return () => clearTimeout(timer);
  }, [foodSearch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFoodSearchChange = (e) => {
    setFoodSearch(e.target.value);
    setForm((prev) => ({ ...prev, food_id: "" }));
  };

  const handleSelectFood = (food) => {
    setForm((prev) => ({ ...prev, food_id: food.id }));
    setFoodSearch(food.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateMission(id, form);
      } else {
        await createMission(form);
      }

      navigate("/admin/missions");
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
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border">

            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit Misi" : "Tambah Misi"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="relative">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Cari Food</span>
                  <input
                    type="text"
                    value={foodSearch}
                    onChange={handleFoodSearchChange}
                    placeholder="Ketik nama food untuk mencari"
                    className="w-full border p-3 rounded-lg mt-1"
                  />
                </label>

                {(foodSearch.trim() !== "" || selectedFoodName) && (
                  <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-lg max-h-72 overflow-y-auto z-20">
                    {foods.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500">
                        {foodSearch.trim() ? "Food tidak ditemukan." : "Ketik nama food untuk mencari"}
                      </div>
                    ) : (
                      foods.slice(0, 8).map((food) => (
                        <button
                          key={food.id}
                          type="button"
                          onClick={() => handleSelectFood(food)}
                          className={`w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-slate-100 ${
                            form.food_id === food.id ? "bg-slate-100" : "bg-white"
                          }`}
                        >
                          {food.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {selectedFoodName ? (
                <div className="px-4 py-3 rounded-lg border bg-green-50 text-green-800">
                  Terpilih: <span className="font-semibold">{selectedFoodName}</span>
                </div>
              ) : null}

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="xp"
                value={form.xp}
                onChange={handleChange}
                placeholder="XP"
                className="w-full border p-3 rounded-lg"
                required
              />

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