import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import ResultModal from "../components/ResultModal";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../shared/utils/api";

export default function MissionUpload() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [missions, setMissions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profileId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/user-missions/profiles/${profileId}`);
        const data = res.data.data;

        setProfile(data.profile);
        setMissions(data.missions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchData();
  }, [profileId]);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleSubmit = async () => {
    try {
      if (!selected) {
        alert("Pilih 1 misi");
        return;
      }

      if (!image) {
        alert("Upload gambar dulu");
        return;
      }

      const formData = new FormData();

      formData.append("missionIds", JSON.stringify([selected]));
      formData.append("file", image);

      const res = await api.post(
        `/user-missions/profiles/complete/${profileId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.data);
      setShowModal(true);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Gagal upload");
    }
  };

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-2xl mx-auto space-y-6">

            <div>
              <h1 className="text-xl font-extrabold">Upload Bukti Misi</h1>
              <p className="text-sm text-gray-500">
                Profile: <span className="font-semibold">{profile?.name}</span>
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border space-y-3">
              {missions.map((m) => (
                <label key={m.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="mission"
                    value={m.id}
                    checked={selected === m.id}
                    onChange={() => handleSelect(m.id)}
                  />
                  <span>{m.title}</span>
                </label>
              ))}
            </div>

            <div className="bg-white p-5 rounded-xl border">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />

              {preview && (
                <img
                  src={preview}
                  className="mt-4 rounded-lg max-h-64 w-full object-cover"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full h-12 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
            >
              Kirim Bukti
            </button>

          </div>
        </main>
      </div>

      <ResultModal
        show={showModal}
        data={result || []}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}