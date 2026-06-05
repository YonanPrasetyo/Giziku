export default function SubmitSection({ onSubmit }) {
  return (
    <div className="space-y-3">

      <button
        onClick={onSubmit}
        className="w-full h-12 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
      >
        Analisis Foto
      </button>
    </div>
  );
}