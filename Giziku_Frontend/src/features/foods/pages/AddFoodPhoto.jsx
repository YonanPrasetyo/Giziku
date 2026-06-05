import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import UploadCard from "../components/UploadCard";
import ProfileSelectCard from "../components/ProfileSelectCard";
import SubmitSection from "../components/SubmitSection";
import api from "../../../shared/utils/api";

export default function AddFoodPhoto() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get("/profiles");
        setProfiles(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!image) {
        alert("Upload gambar dulu");
        return;
      }

      if (!selectedProfile) {
        alert("Pilih profile dulu");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("profileId", selectedProfile);

      const res = await api.post("/results", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const resultId = res.data?.data?.result?.id ?? res.data?.data?.id;
      const completedMissions = res.data?.data?.completedMissions ?? [];
      console.log("Upload berhasil, result response:", res.data);

      if (!resultId) {
        throw new Error("Result ID tidak ditemukan pada response API");
      }

      navigate(`/result/${resultId}`, {
        state: { completedMissions },
      });
    } catch (err) {
      console.error(err);
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
          <div className="max-w-3xl mx-auto space-y-6">

            <UploadCard
              image={image}
              setImage={setImage}
              preview={preview}
              setPreview={setPreview}
            />

            <ProfileSelectCard
              profiles={profiles}
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />

            <SubmitSection onSubmit={handleSubmit} />

            <div className="bg-white rounded-xl border p-5">
              <button
                onClick={() => navigate("/add-food-text", { state: { profileId: selectedProfile } })}
                className="w-full bg-slate-500 text-white py-3 rounded-xl font-bold hover:bg-slate-600"
              >
                Tambah dengan nama makanan
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}