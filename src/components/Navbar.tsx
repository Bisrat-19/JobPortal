import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle, HiChevronDown, HiOutlineHeart } from "react-icons/hi2";
import { useAuth } from "../hooks/useAuth";

const linkBase =
  "text-sm text-slate-600 hover:text-slate-900 transition-colors";

const Navbar = () => {
  const { isAuthenticated, user, signOut, savedJobIds } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      const target = event.target as Node | null;
      if (target && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-600" />
          <span className="font-semibold text-lg text-slate-800">JobPortal</span>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? `${linkBase} text-slate-900 border-b-2 border-emerald-600 pb-1`
                : linkBase
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive
                ? `${linkBase} text-slate-900 border-b-2 border-emerald-600 pb-1`
                : linkBase
            }
          >
            Jobs
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive
                ? `${linkBase} text-slate-900 border-b-2 border-emerald-600 pb-1`
                : linkBase
            }
          >
            Companies
          </NavLink>
        </nav>
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <NavLink
              to="/saved-jobs"
              className={({ isActive }) =>
                `relative flex items-center justify-center rounded-full border px-2.5 py-1 transition-colors ${
                  isActive
                    ? "border-rose-400 bg-rose-50 text-rose-600"
                    : "border-slate-200 text-slate-500 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600"
                }`
              }
            >
              <HiOutlineHeart size={20} />
              {savedJobIds.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-rose-500 text-[11px] font-semibold text-white flex items-center justify-center px-0.5">
                  {savedJobIds.length}
                </span>
              )}
            </NavLink>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 hover:border-emerald-500 hover:bg-slate-50 transition-colors"
              >
                <HiOutlineUserCircle className="text-slate-600" size={22} />
                <span className="text-sm text-slate-700 max-w-[120px] truncate">
                  {user?.name || user?.email || "Profile"}
                </span>
                <HiChevronDown
                  className={`text-slate-500 text-xs transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-lg py-1 text-sm text-slate-700">
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 cursor-not-allowed text-slate-400"
                    disabled
                  >
                    Edit Profile (coming soon)
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <NavLink
              to="/signin"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm transition-colors"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;