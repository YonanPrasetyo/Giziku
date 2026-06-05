import { useEffect, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";
import api from "../../../shared/utils/api";

import ProfileDropdown from "../components/ProfileDropdown";
import HistoryGroup from "../components/HistoryGroup";

export default function ResultHistoryPage() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await api.get("/profiles");
      setProfiles(res.data.data);
      setSelectedProfile(res.data.data[0]?.id);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (!selectedProfile) return;

    const fetchResults = async () => {
      try {
        const res = await api.get(`/history/profiles/${selectedProfile}`);
        setResults(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [selectedProfile]);

  const grouped = results.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();

    if (!acc[date]) acc[date] = [];
    acc[date].push(item);

    return acc;
  }, {});

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-5xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
              <h1 className="text-xl font-extrabold">Riwayat Makanan</h1>

              </div>
                <div className="">
                  <div className="mb-2">
                  <h2 className="text-lg font-bold">Pilih Profile</h2>
                </div>
                <ProfileDropdown
                  profiles={profiles}
                  selected={selectedProfile}
                  onChange={setSelectedProfile}
                />
              </div>

            {Object.keys(grouped).map((date) => (
              <HistoryGroup key={date} date={date} items={grouped[date]} />
            ))}

          </div>
        </main>
      </div>
    </div>
  );
}