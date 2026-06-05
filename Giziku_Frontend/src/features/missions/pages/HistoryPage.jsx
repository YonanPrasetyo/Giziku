import React, { useState } from "react";
import Sidebar from "../../../shared/components/Sidebar";
import Header from "../../../shared/components/Header";

export default function HistoryPage() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 1024);

  const history = [
    {
      date: "2026-05-27",
      batches: [
        {
          type: "Sarapan",
          missions: [
            { title: "Minum air putih", completed: true },
            { title: "Makan buah", completed: true },
            { title: "Sarapan sehat", completed: false },
          ],
        },
        {
          type: "Makan Siang",
          missions: [
            { title: "Makan sayur", completed: true },
            { title: "Protein cukup", completed: true },
            { title: "Minum air", completed: true },
          ],
        },
        {
          type: "Makan Malam",
          missions: [
            { title: "Makan ringan", completed: false },
            { title: "Kurangi gula", completed: true },
            { title: "Minum air", completed: true },
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex flex-col min-h-screen ${isOpen ? "lg:ml-64" : ""}`}>
        
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-4xl mx-auto space-y-6">

            <h1 className="text-2xl font-bold">Riwayat Misi</h1>

            {history.map((day, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border shadow-sm">

                <h2 className="font-semibold text-lg mb-4">
                  {day.date}
                </h2>

                <div className="space-y-4">
                  {day.batches.map((batch, i) => {
                    const completedCount = batch.missions.filter(m => m.completed).length;

                    return (
                      <div key={i} className="border rounded-xl p-4">

                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold">
                            {batch.type}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {completedCount}/3 selesai
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {batch.missions.map((mission, j) => (
                            <li key={j} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={mission.completed}
                                readOnly
                              />
                              <span
                                className={
                                  mission.completed
                                    ? "line-through text-gray-400"
                                    : ""
                                }
                              >
                                {mission.title}
                              </span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}

          </div>
        </main>
      </div>
    </div>
  );
}