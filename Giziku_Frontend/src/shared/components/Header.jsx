import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../features/auth/context/AuthContext";

export default function Header({ isOpen, setIsOpen }) {
  const [openMenu, setOpenMenu] = useState(false);

  const { logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <h1 className="font-extrabold text-lg">
            Giziku
          </h1>
        </div>

        <div className="flex items-center gap-3 relative">

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700"
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </button>

          {openMenu && (
            <div className="absolute right-0 top-12 w-48 bg-white border rounded-xl shadow-md overflow-hidden z-50">

              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold">
                  {user?.email || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "role"}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-50"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}