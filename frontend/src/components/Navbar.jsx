import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 shadow-lg shadow-violet-500/20">
            🌀
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
              V.E.N.T
            </h1>

            <p className="text-[10px] uppercase tracking-widest text-slate-400">
              Voice • Emotion • No Judgement • Truth
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-slate-300">
          <Link
            to="/"
            className="transition hover:text-white"
          >
            Home
          </Link>
          <Link
  to="/create"
  className="
    rounded-xl
    bg-gradient-to-r
    from-violet-500
    via-purple-500
    to-cyan-500
    px-4
    py-2
    font-medium
    text-white
    transition
    hover:opacity-90
  "
>
  Create Vent
</Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="transition hover:text-white"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="rounded-xl border border-white/10 px-4 py-2 transition hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 px-4 py-2 font-medium text-white transition hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;