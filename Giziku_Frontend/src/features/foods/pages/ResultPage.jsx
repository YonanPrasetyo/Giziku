import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";

import FoodIdentityCard from "../components/FoodIdentityCard";
import EnergyHero from "../components/EnergyHero";
import NutritionCard from "../components/NutritionCard";
import SummaryTable from "../components/SummaryTable";
import DailyContribution from "../components/DailyContribution";
import BottomActions from "../components/BottomActions";

import { getResultById, getNutritionStandard } from "../services/resultService";

export default function ResultPage() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [result, setResult] = useState(null);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [standard, setStandard] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getResultById(id, token);
      const resultData = res?.result ?? res;
      const missions = location.state?.completedMissions ?? [];

      setResult(resultData);
      setCompletedMissions(missions);

      console.log("Result:", res);

      if (resultData?.age && resultData?.gender) {
        const std = await getNutritionStandard(resultData.age, resultData.gender, token);
        setStandard(std);
      } else {
        setStandard(null);
      }
    };

    fetchData();
  }, [id, token, location.state]);

  if (!result) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="w-full p-4 md:p-6 max-w-6xl mx-auto space-y-4 flex-1">
          <FoodIdentityCard data={result} />
          <EnergyHero data={result} standard={standard} />

          <div>
            <h2 className="font-bold text-lg mb-2">Rincian Nutrisi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NutritionCard
                label="Protein"
                value={result.protein}
                max={standard?.protein ?? undefined}
                color="blue"
                unit="g"
              />
              <NutritionCard
                label="Gula"
                value={result.sugar}
                max={standard?.sugar ?? undefined}
                color="red"
                unit="g"
              />
              <NutritionCard
                label="Lemak"
                value={result.fat}
                max={standard?.fat ?? undefined}
                color="purple"
                unit="g"
              />
              <NutritionCard
                label="Karbohidrat"
                value={result.carbohydrates}
                max={standard?.carbohydrates ?? undefined}
                color="yellow"
                unit="g"
              />
            </div>
          </div>

          {completedMissions.length > 0 && (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Misi yang Disetujui</h2>
              <div className="space-y-3">
                {completedMissions.map((mission, index) => (
                  <div key={mission.userMissionId || index} className="rounded-xl border p-4 bg-slate-50">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold">Misi ID: {mission.userMissionId ?? "-"}</span>
                      <span className={`text-xs font-semibold uppercase ${mission.status === "approved" ? "text-green-700" : "text-yellow-700"}`}>
                        {mission.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">XP: {mission.xp}</p>
                    {mission.description ? (
                      <p className="text-sm text-gray-700 mt-2">Deskripsi: {mission.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <BottomActions />
      </div>
    </div>
  );
}