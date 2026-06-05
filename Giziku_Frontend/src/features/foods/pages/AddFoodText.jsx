import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import ProfileSelectCard from "../components/ProfileSelectCard";
import { getFoods } from "../services/foodService";
import { createResultByFoodName } from "../services/resultService";
import api from "../../../shared/utils/api";

export default function AddFoodText() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [foodText, setFoodText] = useState("");
  const [foodSearch, setFoodSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get("/profiles");
        const items = res.data.data;
        setProfiles(items);

        const profileId = location.state?.profileId;
        if (profileId && items.some((profile) => profile.id === profileId)) {
          setSelectedProfile(profileId);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [location.state]);

  useEffect(() => {
    const fetchFoodSuggestions = async () => {
      if (!foodSearch.trim()) {
        setFoods([]);
        return;
      }

      try {
        const items = await getFoods(foodSearch.trim());
        setFoods(items || []);
      } catch (err) {
        console.error("Gagal ambil data food:", err);
      }
    };

    const timer = setTimeout(fetchFoodSuggestions, 300);
    return () => clearTimeout(timer);
  }, [foodSearch]);

  const handleFoodSearchChange = (e) => {
    setFoodSearch(e.target.value);
    setFoodText(e.target.value);
  };

  const handleSelectFood = (food) => {
    setFoodText(food.name);
    setFoodSearch(food.name);
    setFoods([]);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedProfile) {
        alert("Pilih profile dulu");
        return;
      }

      if (!foodText.trim()) {
        alert("Ketik nama makanan dulu");
        return;
      }

      const result = await createResultByFoodName({
        profileId: selectedProfile,
        foodName: foodText.trim(),
      });

      const resultId = result?.id;
      if (!resultId) {
        throw new Error("Result ID tidak ditemukan pada response API");
      }

      navigate(`/result/${resultId}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal menambahkan result");
    }
  };

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-xl font-extrabold">Tambah Food dengan Pilihan</h1>
              <p className="text-sm text-gray-500">Pilih deskripsi makanan dari daftar yang bisa diketik.</p>
            </div>

            <div className="bg-white rounded-xl border p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Pilih Makanan</h2>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">1</span>
              </div>

              <div className="relative">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Cari nama makanan</span>
                  <input
                    type="text"
                    value={foodSearch}
                    onChange={handleFoodSearchChange}
                    placeholder="Ketik nama makanan untuk mencari"
                    className="w-full h-12 border p-3 rounded-xl mt-1"
                  />
                </label>

                {(foodSearch.trim() !== "" || foods.length > 0) && (
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
                          className="w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-slate-100"
                        >
                          {food.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Hasil Pilihan</label>
                <div className="min-h-[48px] rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                  {foodText || "Belum ada pilihan."}
                </div>
              </div>
            </div>

            <ProfileSelectCard
              profiles={profiles}
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />

            <div className="bg-white rounded-xl border p-5">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
