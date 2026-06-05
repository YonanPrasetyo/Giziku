import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import api from "../../../shared/utils/api";

import ProfileDropdown from "../components/ProfileDropdown";
import WelcomeStrip from "../components/WelcomeStrip";
import DailySummary from "../components/DailySummary";
import LatestMeals from "../components/LatestMeals";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [summary, setSummary] = useState(null);
  const [latestMeals, setLatestMeals] = useState([]);

  const [standard, setStandard] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await api.get("/profiles");
      setProfiles(res.data.data);
      setSelectedProfile(String(res.data.data[0]?.id || ""));
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (!selectedProfile) return;

    const selected = profiles.find(p => String(p.id) === selectedProfile);
    if (!selected) return;

    const fetchData = async () => {
      try {
        const [summaryRes, latestRes, standardRes] = await Promise.all([
          api.get(`/results/profiles/${selectedProfile}/today`),
          api.get(`/results/profiles/${selectedProfile}/latest`),
          api.get(`/nutrition-standards/age/${selected.age}/gender/${selected.gender}`)
        ]);

        setSummary(summaryRes.data.data);
        setLatestMeals(latestRes.data.data);
        setStandard(standardRes.data.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedProfile, profiles]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-5xl mx-auto space-y-6">

            <WelcomeStrip />

            <div>
              <div className="mb-2">
                <h2 className="text-lg font-bold">Pilih Profile</h2>
              </div>

              {profiles.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border text-center">
                  <p className="text-sm text-gray-600 mb-4">Belum ada profil.</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
                  >
                    Tambah Profil
                  </button>
                </div>
              ) : (
                <ProfileDropdown
                  profiles={profiles}
                  selected={selectedProfile}
                  onChange={setSelectedProfile}
                />
              )}
            </div>

            <DailySummary data={summary} standard={standard} />
            <LatestMeals meals={latestMeals} />

            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                onClick={() => navigate("/history")}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
              >
                Histori
              </button>
              <button
                onClick={() => navigate("/add-food-photo")}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Tambah Foto Makanan
              </button>
            </div>


          </div>
        </main>
      </div>
    </div>
  );
}