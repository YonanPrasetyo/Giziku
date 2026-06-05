export default function WelcomeStrip({ streak }) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-2xl">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-80">
            {new Date().toLocaleDateString()}
          </p>
          <h2 className="text-xl font-extrabold">
            Halo!
          </h2>
        </div>

        <div className="bg-white/20 px-4 py-2 rounded-xl text-center">
          <div className="font-bold">{streak?.current_streak || 0}</div>
          <div className="text-xs opacity-80">Hari Berturut</div>
        </div>

      </div>
    </div>
  );
}