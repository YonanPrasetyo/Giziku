import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-white border-r z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">

          <div className="p-5 border-b font-extrabold text-lg">
            Giziku
          </div>

          <div className="flex-1 p-4 space-y-2">

            {(!user || user.role === "user") && (
              <>
                <NavItem to="/" label="Beranda" setIsOpen={setIsOpen} />
                <NavItem to="/missions" label="Misi Harian" setIsOpen={setIsOpen} />
                <NavItem to="/profile" label="Profil" setIsOpen={setIsOpen} />
              </>
            )}

            {user?.role === "admin" && (
              <>
                <NavItem to="/admin/missions" label="Kelola Misi" setIsOpen={setIsOpen} />
                <NavItem to="/admin/ranks" label="Kelola Rank" setIsOpen={setIsOpen} />
                <NavItem to="/admin/foods" label="Kelola Foods" setIsOpen={setIsOpen} />
                <NavItem to="/admin/nutrition-standards" label="Standar Gizi" setIsOpen={setIsOpen} />
              </>
            )}

          </div>

        </div>
      </aside>
    </>
  );
}

function NavItem({ to, label, setIsOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => {
        if (window.innerWidth < 1024) {
          setIsOpen(false);
        }
      }}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-medium
        ${
          isActive
            ? "bg-green-100 text-green-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}