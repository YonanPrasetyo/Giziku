export default function SummaryTable({ result, standard }) {
  const items = [
    { name: "Energi", val: result.calories, max: standard.calories },
    { name: "Protein", val: result.protein, max: standard.protein },
    { name: "Lemak", val: result.fat, max: standard.fat },
    { name: "Karbo", val: result.carbohydrates, max: standard.carbohydrates },
    { name: "Gula", val: result.sugar, max: standard.sugar },
  ];

  return (
    <div className="bg-white rounded-2xl border p-4">
      <h2 className="font-bold mb-3">Ringkasan</h2>

      {items.map((i, idx) => {
        const percent = (i.val / i.max) * 100;
        return (
          <div key={idx} className="flex justify-between text-sm py-1">
            <span>{i.name}</span>
            <span>{percent.toFixed(1)}%</span>
          </div>
        );
      })}
    </div>
  );
}