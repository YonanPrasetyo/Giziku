import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRanks, deleteRank } from "../services/rankService";

export default function AdminRanks() {
  const [ranks, setRanks] = useState([]);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const navigate = useNavigate();

  const fetchRanks = async () => {
    const data = await getRanks();
    setRanks(data || []);
  };

  useEffect(() => {
    fetchRanks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus rank?")) return;
    await deleteRank(id);
    fetchRanks();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-5xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Kelola Rank</h1>

              <button
                onClick={() => navigate("/admin/ranks/create")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                + Tambah Rank
              </button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {ranks.length === 0 ? (
                <div className="p-5 text-center text-gray-500">
                  Tidak ada data rank
                </div>
              ) : (
                ranks.map((rank) => (
                  <div
                    key={rank.id}
                    className="flex items-center justify-between p-4 border-b"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={rank.icon_url}
                        alt="icon"
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <p className="font-semibold">{rank.name}</p>
                        <p className="text-sm text-gray-500">
                          {rank.min_xp} - {rank.max_xp} XP
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/ranks/edit/${rank.id}`)}
                        className="px-3 py-1 text-sm bg-yellow-400 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(rank.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded"
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