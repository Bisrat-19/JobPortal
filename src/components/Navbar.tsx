import { NavLink } from "react-router-dom";

const linkBase =
  "text-sm text-slate-600 hover:text-slate-900 transition-colors";

const Navbar = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-600" />
          <span className="font-semibold text-lg text-slate-800">JobPortal</span>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
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
      </div>
    </header>
  );
};

export default Navbar;