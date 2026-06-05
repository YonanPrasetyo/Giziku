import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProfile,
  getProfileById,
  updateProfile,
} from "../services/profileService";
import { useAuth } from "../../../hooks/useAuth";

export default function ProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    gender: "M",
    relation: "",
  });

  useEffect(() => {
    if (id) {
      getProfileById(id).then((data) => {
        setForm({
          name: data.name,
          dateOfBirth: data.dateOfBirth?.slice(0, 10),
          weight: data.weight,
          height: data.height,
          gender: data.gender,
          relation: data.relation,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: user.id, 
      ...form,
    };

    if (id) {
      await updateProfile(id, payload);
    } else {
      await createProfile(payload);
    }

    navigate("/profile");
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow-sm">

            <h1 className="text-lg font-bold mb-4">
              {id ? "Edit Profile" : "Tambah Profile"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="name"
                placeholder="Nama Anak"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="weight"
                placeholder="Berat (kg)"
                value={form.weight}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                name="height"
                placeholder="Tinggi (cm)"
                value={form.height}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              >
                <option value="">Pilih Gender</option>
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>

              <input
                name="relation"
                placeholder="Hubungan (Anak, Adik, dll)"
                value={form.relation}
                onChange={handleChange}
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