import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRank,
  getRankById,
  updateRank,
} from "../services/rankService";

export default function RankForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);
  const [form, setForm] = useState({
    name: "",
    minXp: "",
    maxXp: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      getRankById(id).then((data) => {
        setForm({
          name: data.name,
          minXp: data.min_xp,
          maxXp: data.max_xp,
        });
        setPreview(data.icon_url);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("minXp", form.minXp);
    formData.append("maxXp", form.maxXp);

    if (file) {
      formData.append("icon", file);
    }

    if (id) {
      await updateRank(id, formData);
    } else {
      await createRank(formData);
    }

    navigate("/admin/ranks");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow-sm">

            <h1 className="text-lg font-bold mb-4">
              {id ? "Edit Rank" : "Tambah Rank"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Nama Rank"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="minXp"
                placeholder="Min XP"
                value={form.minXp}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="maxXp"
                placeholder="Max XP"
                value={form.maxXp}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input type="file" onChange={handleFile} />

              {preview && (
                <img
                  src={preview}
                  className="w-20 h-20 object-cover rounded-full"
                />
              )}

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