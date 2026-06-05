import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMissions,
  deleteMission,
} from "../services/missionService";

export default function AdminMissions() {
  const [missions, setMissions] = useState([]);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getMissions();
      setMissions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchDataEffect = async () => {
      try {
        const res = await getMissions();
        setMissions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDataEffect();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus?")) return;

    try {
      await deleteMission(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-6">
          <div className="max-w-5xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Manajemen Misi</h1>

              <button
                onClick={() => navigate("/admin/missions/create")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                + Tambah Misi
              </button>
            </div>

            <div className="grid gap-4">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-4 rounded-xl border flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{m.food?.name || m.title || "–"}</h3>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                    <p className="text-xs text-green-600 font-semibold">
                      {m.xp} XP
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/missions/edit/${m.id}`)
                      }
                      className="px-3 py-1 text-sm bg-yellow-400 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(m.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}