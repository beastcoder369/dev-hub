import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(""); }
  };

  const LINKS = [
    { heading: "product", items: ["discover", "connections", "requests", "profile"] },
    { heading: "company", items: ["about", "blog", "careers", "press"] },
    { heading: "legal",   items: ["privacy", "terms", "cookies", "security"] },
  ];

  const SOCIALS = [
    {
      label: "GitHub",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.262 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Discord",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap');

        .footer-font   { font-family: 'JetBrains Mono', monospace; }
        .syne-font     { font-family: 'Syne', sans-serif; }

        .text-dim-1    { color: rgba(255,255,255,0.20); }
        .text-dim-2    { color: rgba(255,255,255,0.25); }
        .text-dim-3    { color: rgba(255,255,255,0.30); }
        .text-dim-5    { color: rgba(255,255,255,0.15); }

        .accent-line   { height: 1px; background: linear-gradient(90deg, transparent, rgba(244,63,94,0.45), transparent); }
        .footer-divider{ border-top: 1px solid rgba(255,255,255,0.05); }

        .social-btn    { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.35); transition: all 0.2s; }
        .social-btn:hover { color: #fb7185; border-color: rgba(244,63,94,0.30); background: rgba(244,63,94,0.08); }

        .input-email   { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); border-right: none; color: #fff; font-family: 'JetBrains Mono', monospace; font-size: 11px; outline: none; transition: all 0.2s; }
        .input-email::placeholder { color: rgba(255,255,255,0.22); }
        .input-email:focus { border-color: rgba(244,63,94,0.45); background: rgba(255,255,255,0.08); }

        .footer-link   { color: rgba(255,255,255,0.38); transition: color 0.15s; font-size: 11.5px; display: flex; align-items: center; gap: 5px; }
        .footer-link:hover { color: rgba(255,255,255,0.85); }
        .nav-arrow     { color: transparent; font-size: 9px; transition: color 0.15s; line-height: 1; }
        .footer-link:hover .nav-arrow { color: rgba(244,63,94,0.55); }

        .sent-text     { color: rgba(251,113,133,0.85); font-size: 11px; }
        .heart-text    { color: rgba(244,63,94,0.55); }
        .tagline-match { color: rgba(251,113,133,0.75); }
      `}</style>

      <footer
        className="footer-font w-full"
        style={{ background: "#09090d", borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Accent line */}
        <div className="accent-line w-full" />

        {/* Main grid */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">

            {/* Brand col */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-2 flex flex-col gap-5">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 w-fit">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #f43f5e, #fb923c, #fbbf24)", boxShadow: "0 0 14px rgba(244,63,94,0.40)" }}
                >
                  <span className="text-white font-black text-xs leading-none">&lt;/&gt;</span>
                </div>
                <span className="syne-font text-base font-black tracking-tight text-white leading-none">
                  dev<span className="text-rose-400">hub</span>
                </span>
              </Link>

              {/* Tagline */}
              <p className="text-dim-3 leading-relaxed text-xs" style={{ maxWidth: "210px" }}>
                // where developers<br />
                find their <span className="tagline-match">perfect match</span>
              </p>

              {/* Newsletter */}
              {sent ? (
                <p className="sent-text">✓ you're on the list</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex" style={{ maxWidth: "230px" }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-email flex-1 min-w-0 rounded-l-lg px-3 py-2"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-r-lg text-white text-xs font-bold hover:opacity-90 transition-opacity "
                    style={{ background: "linear-gradient(90deg, #f43f5e, #fb923c)" }}
                  >
                    →
                  </button>
                </form>
              )}

              {/* Socials */}
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="social-btn w-8 h-8 flex items-center justify-center rounded-lg"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h6
                  className="text-dim-2 font-bold uppercase"
                  style={{ fontSize: "9.5px", letterSpacing: "2.5px" }}
                >
                  {col.heading}
                </h6>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <li key={item}>
                      <Link to="#" className="footer-link group">
                        <span className="nav-arrow"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-divider">
          <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-dim-1 text-xs">© {new Date().getFullYear()} devhub, inc.</p>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-dim-1 text-xs">all systems operational</span>
            </div>

            <p className="text-dim-5 text-xs">
              built with <span className="heart-text">♥</span> &amp; caffeine
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
