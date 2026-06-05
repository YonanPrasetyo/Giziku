import HistoryItem from "./HistoryItem";

export default function HistoryGroup({ date, items }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-gray-500 mb-2">
        {date}
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <HistoryItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}