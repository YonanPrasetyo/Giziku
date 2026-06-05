import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles, deleteProfile } from "../services/profileService";

export default function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    const data = await getProfiles();
    setProfiles(data || []);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus profile ini?")) return;
    await deleteProfile(id);
    fetchProfiles();
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-4xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Profile Anak</h1>

              <button
                onClick={() => navigate("/profile/create")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                + Tambah
              </button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {profiles.length === 0 ? (
                <div className="p-5 text-center text-gray-500">
                  Belum ada profile
                </div>
              ) : (
                profiles.map((p) => (
                  <div key={p.id} className="p-4 border-b flex justify-between items-center">

                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        {p.gender} • {p.relation}
                      </p>
                      <p className="text-xs text-gray-400">
                        BB: {p.weight}kg | TB: {p.height}cm
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/profile/edit/${p.id}`)}
                        className="px-3 py-1 text-sm bg-yellow-400 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
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