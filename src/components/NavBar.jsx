import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constents";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user      = useSelector((store) => store.user);
  const dispatch  = useDispatch();
  const nagivate  = useNavigate();
  const location  = useLocation();

  const [scrolled,   setScrolled]   = useState(false);
  const [dropOpen,   setDropOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  const logouthandel = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      nagivate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const NAV_LINKS = [
    { to: "/feed",            label: "discover"    },
    { to: "/connections", label: "connections" },
    { to: "/request",     label: "requests"    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap');

        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.94) translateY(-6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .nav-drop  { animation: dropIn      0.16s cubic-bezier(0.22, 1, 0.36, 1); }
        .mobile-dd { animation: mobileSlide 0.18s cubic-bezier(0.22, 1, 0.36, 1); }

        /* Anything using non-standard opacity fractions → inline styles below */
        .nav-root        { font-family: 'JetBrains Mono', monospace; }
        .logo-font       { font-family: 'Syne', sans-serif; }
        .drop-bg         { background: rgba(11, 9, 15, 0.97); backdrop-filter: blur(24px); }
        .mobile-bg       { background: rgba(9, 9, 13, 0.98);  backdrop-filter: blur(20px); }
        .nav-scrolled    { background: rgba(9, 9, 13, 0.96);  backdrop-filter: blur(20px); box-shadow: 0 4px 30px rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.07); }
        .nav-default     { background: rgba(9, 9, 13, 0.75);  backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.04); }

        .nav-link-active { color: #fff; background: rgba(255,255,255,0.08); }
        .nav-link-base   { color: rgba(255,255,255,0.35); }
        .nav-link-base:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.05); }

        .icon-btn        { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); }
        .icon-btn:hover  { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); }

        .avatar-btn      { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
        .avatar-btn:hover{ background: rgba(255,255,255,0.08); border-color: rgba(244,63,94,0.3); }

        .drop-item-base  { color: rgba(255,255,255,0.45); }
        .drop-item-base:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .drop-item-active{ color: #fb7185; background: rgba(244,63,94,0.1); }

        .logout-item     { color: rgba(255,255,255,0.35); }
        .logout-item:hover{ color: #f87171; background: rgba(239,68,68,0.09); }

        .mobile-link-active { color: #fff; background: rgba(255,255,255,0.07); border-left: 2px solid #f43f5e; }
        .mobile-link-base   { color: rgba(255,255,255,0.38); border-left: 2px solid transparent; }
        .mobile-link-base:hover { color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.05); }

        .mobile-logout   { color: rgba(255,255,255,0.3); border-left: 2px solid transparent; }
        .mobile-logout:hover { color: #f87171; background: rgba(239,68,68,0.08); }

        .notif-dot { background: #f43f5e; border: 1.5px solid #09090d; }
        .avatar-border { border: 1px solid rgba(244,63,94,0.35); }
        .drop-divider  { background: rgba(255,255,255,0.05); }
        .drop-head-border { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mobile-section-divider { background: rgba(255,255,255,0.05); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className={`nav-root sticky top-0 z-50 w-full h-13 flex items-center transition-all duration-300 ${scrolled ? "nav-scrolled" : "nav-default"}`}
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-5 flex items-center gap-2">

          {/* Logo */}
          <Link to="/feed" className="flex items-center gap-2 shrink-0 mr-3 group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #f43f5e, #fb923c, #fbbf24)", boxShadow: "0 0 12px rgba(244,63,94,0.45)" }}
            >
              <span className="text-white font-black text-xs leading-none">&lt;/&gt;</span>
            </div>
            <span className="logo-font text-base font-black tracking-tight text-white leading-none">
              devloper<span className="text-rose-400">hub</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${isActive(l.to) ? "nav-link-active" : "nav-link-base"}`}
              >
                {isActive(l.to) && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #f43f5e, #fb923c)" }}
                  />
                )}
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex-1" />

          {/* Right controls */}
          <div className="flex items-center gap-1.5">

            {/* Notification bell */}
            <button
              className="icon-btn relative w-8 h-8 flex items-center justify-center rounded-lg text-white transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.35)" }}
              aria-label="Notifications"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="notif-dot absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" />
            </button>

            {/* Avatar + Dropdown */}
            {user ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen((o) => !o)}
                  className="avatar-btn flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl transition-all duration-200 group"
                >
                  <div className="avatar-border w-6 h-6 rounded-lg overflow-hidden shrink-0">
                    <img src={user.photoUrl} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <span
                    className="hidden sm:block text-xs font-medium max-w-20 truncate transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {user.firstName}
                  </span>
                  <svg
                    className={`shrink-0 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                    style={{ color: "rgba(255,255,255,0.25)" }}
                    width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropOpen && (
                  <div
                    className="nav-drop drop-bg absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden border border-white border-opacity-10 shadow-2xl"
                  >
                    {/* User info */}
                    <div className="drop-head-border px-4 py-3">
                      <p
                        className="logo-font text-xs font-bold truncate"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.28)", fontSize: "10px" }}>
                        {user.emailId}
                      </p>
                    </div>

                    <div className="p-1.5 flex flex-col gap-0.5">
                      {[
                        { to: "/profile",     label: "profile",     badge: "new" },
                        { to: "/connections", label: "connections",  badge: null  },
                        { to: "/request",     label: "requests",     badge: null  },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setDropOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${isActive(item.to) ? "drop-item-active" : "drop-item-base"}`}
                        >
                          {item.label}
                          {item.badge && (
                            <span
                              className="text-rose-400 font-bold uppercase tracking-widest rounded-full px-1.5 py-0.5"
                              style={{ fontSize: "8px", background: "rgba(244,63,94,0.15)" }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}

                      <div className="drop-divider h-px my-1 mx-1" />

                      <button
                        onClick={() => { setDropOpen(false); logouthandel(); }}
                        className="logout-item flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 w-full text-left"
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(90deg, #f43f5e, #fb923c)", boxShadow: "0 0 12px rgba(244,63,94,0.3)" }}
              >
                login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="icon-btn md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.45)" }}
              aria-label="Menu"
            >
              {mobileOpen
                ? <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="mobile-dd mobile-bg md:hidden sticky top-13 z-40 w-full border-b border-white border-opacity-5 nav-root">
          <div className="px-4 pt-2 pb-3 flex flex-col gap-0.5">

            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${isActive(l.to) ? "mobile-link-active" : "mobile-link-base"}`}
              >
                <span className="text-rose-500 opacity-50 text-xs">//</span>
                {l.label}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${isActive("/profile") ? "mobile-link-active" : "mobile-link-base"}`}
                >
                  <span className="text-rose-500 opacity-50 text-xs">//</span>
                  profile
                  <span
                    className="ml-auto text-rose-400 font-bold uppercase tracking-widest rounded-full px-1.5 py-0.5"
                    style={{ fontSize: "8px", background: "rgba(244,63,94,0.15)" }}
                  >
                    new
                  </span>
                </Link>

                <div className="mobile-section-divider h-px my-1 mx-1" />

                <button
                  onClick={logouthandel}
                  className="mobile-logout flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 w-full text-left"
                >
                  <span className="text-red-500 opacity-40 text-xs">//</span>
                  logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
