export default function ProfileDropdown({ profiles, selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 text-sm"
    >
      {profiles.map((p) => (
        <option key={p.id} value={String(p.id)}>
          {p.name}
        </option>
      ))}
    </select>
  );
}