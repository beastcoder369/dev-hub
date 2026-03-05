import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constents";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

/* ── Floating card decoration (same as Login) ───────────── */
const FLOAT_CARDS = [
  { top: "8%",  left: "4%",  rotate: "-14deg", delay: "0s",   emoji: "🔥" },
  { top: "15%", right: "6%", rotate: "10deg",  delay: "0.6s", emoji: "💘" },
  { top: "55%", left: "2%",  rotate: "-8deg",  delay: "1.2s", emoji: "✨" },
  { top: "62%", right: "4%", rotate: "15deg",  delay: "0.3s", emoji: "💫" },
  { top: "80%", left: "8%",  rotate: "6deg",   delay: "0.9s", emoji: "❤️" },
  { top: "78%", right: "7%", rotate: "-12deg", delay: "1.5s", emoji: "💥" },
];

const Signup = () => {
  const [fristname, setfristname] = useState("");
  const [lastname,  setlastname]  = useState("");
  const [email,     setemail]     = useState("");
  const [password,  setpassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [focused,   setFocused]   = useState("");
  const [error,     setError]     = useState("");

  const nagivate = useNavigate();
  const dispatch = useDispatch();

  const signuphandel = async () => {
    try {
      const signupdata = await axios.post(
        BASE_URL + "/signup",
        { firstName: fristname, lastName: lastname, emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(signupdata.data));
      nagivate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  /* ── shared input style (identical to Login) ── */
  const inputStyle = (key) => ({
    width: "100%",
    paddingLeft: "42px",
    paddingRight: "16px",
    paddingTop: "13px",
    paddingBottom: "13px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border: `1.5px solid ${focused === key ? "#fd473f" : "rgba(255,255,255,0.1)"}`,
    boxShadow: focused === key ? "0 0 0 3px rgba(253,71,63,0.18)" : "none",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  });

  const iconColor = (key) =>
    focused === key ? "#fd473f" : "rgba(255,255,255,0.25)";

  return (
    <>
      {/* ── Fonts & animations (identical to Login) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Dancing+Script:wght@700&display=swap');

        @keyframes floatUp {
          0%   { transform: translateY(0px)   rotate(var(--r)); }
          50%  { transform: translateY(-18px) rotate(var(--r)); }
          100% { transform: translateY(0px)   rotate(var(--r)); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0    rgba(253,71,63,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(253,71,63,0);   }
          100% { box-shadow: 0 0 0 0    rgba(253,71,63,0);   }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .float-card  { animation: floatUp    4s ease-in-out infinite; }
        .form-animate{ animation: fadeSlideUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .btn-fire {
          background: linear-gradient(135deg, #fd473f 0%, #ff6b35 50%, #ffb347 100%);
          border: none; position: relative; overflow: hidden;
          transition: transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 6px 28px rgba(253,71,63,0.45);
        }
        .btn-fire:hover  { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(253,71,63,0.6); }
        .btn-fire:active { transform: translateY(0); }
        .btn-fire::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          background-size: 400px 100%;
          animation: shimmer 2.4s infinite;
        }
        .logo-pulse { animation: pulseRing 2.5s infinite; }
        .divider-line::before,
        .divider-line::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.12);
        }
        .social-btn { transition: transform 0.15s, box-shadow 0.2s, background 0.2s; }
        .social-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
      `}</style>

      {/* ── Full-screen background ── */}
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f0c0c 0%, #1a0505 40%, #200a02 70%, #0d0d0d 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Nunito', sans-serif",
        position: "relative", overflow: "hidden",
        padding: "24px 16px",
      }}>

        {/* Radial glow */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(253,71,63,0.13) 0%, transparent 70%)", pointerEvents:"none" }} />

        {/* Floating emoji cards */}
        {FLOAT_CARDS.map((c, i) => (
          <div
            key={i}
            className="float-card"
            style={{
              position:"absolute", top:c.top, left:c.left, right:c.right,
              "--r": c.rotate, animationDelay: c.delay,
              animationDuration: `${3.5 + i * 0.4}s`,
              width:"52px", height:"68px", borderRadius:"12px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              backdropFilter:"blur(8px)", display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:"24px",
              boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            {c.emoji}
          </div>
        ))}

        {/* ── Card ── */}
        <div
          className="form-animate"
          style={{
            width: "100%", maxWidth: "420px",
            background: "rgba(18,12,12,0.85)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(253,71,63,0.1)",
            padding: "44px 36px 36px",
            position: "relative", zIndex: 10,
          }}
        >
          {/* Top accent line */}
          <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:"2px", borderRadius:"0 0 4px 4px", background:"linear-gradient(90deg, transparent, #fd473f, #ff9f43, transparent)" }} />

          {/* Logo */}
          <div style={{ textAlign:"center", marginBottom:"24px" }}>
            <div
              className="logo-pulse"
              style={{
                width:"64px", height:"64px", borderRadius:"20px",
                background:"linear-gradient(135deg, #fd473f 0%, #ff6b35 60%, #ffb347 100%)",
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontSize:"32px", marginBottom:"12px",
                boxShadow:"0 8px 32px rgba(253,71,63,0.5)",
              }}
            >
              🔥
            </div>
            <h1 style={{ fontFamily:"'Dancing Script', cursive", fontSize:"36px", fontWeight:700, color:"#fff", margin:"0 0 4px", lineHeight:1 }}>
              Spark
            </h1>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.38)", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", margin:0 }}>
              Create your account
            </p>
          </div>

          {/* Social buttons */}
          <div style={{ display:"flex", gap:"12px", marginBottom:"24px" }}>
            {[
              { label:"Google", icon: <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/></svg> },
              { label:"Apple",  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
            ].map(btn => (
              <button
                key={btn.label}
                className="social-btn"
                style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"11px", borderRadius:"14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontWeight:700, fontSize:"14px", cursor:"pointer" }}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-line" style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"22px" }}>
            <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)", fontWeight:700, letterSpacing:"1px", whiteSpace:"nowrap" }}>or sign up with email</span>
          </div>

          {/* ── First name + Last name row ── */}
          <div style={{ display:"flex", gap:"12px", marginBottom:"14px" }}>
            {/* First Name */}
            <div style={{ flex:1 }}>
              <label style={{ display:"block", fontSize:"12px", fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"7px" }}>
                First
              </label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:iconColor("fname"), transition:"color 0.2s", pointerEvents:"none" }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  value={fristname}
                  placeholder="John"
                  onFocus={() => setFocused("fname")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => setfristname(e.target.value)}
                  style={{ ...inputStyle("fname"), paddingLeft:"36px", fontSize:"14px" }}
                />
              </div>
            </div>

            {/* Last Name */}
            <div style={{ flex:1 }}>
              <label style={{ display:"block", fontSize:"12px", fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"7px" }}>
                Last
              </label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:iconColor("lname"), transition:"color 0.2s", pointerEvents:"none" }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  value={lastname}
                  placeholder="Doe"
                  onFocus={() => setFocused("lname")}
                  onBlur={() => setFocused("")}
                  onChange={(e) => setlastname(e.target.value)}
                  style={{ ...inputStyle("lname"), paddingLeft:"36px", fontSize:"14px" }}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom:"14px" }}>
            <label style={{ display:"block", fontSize:"12px", fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"7px" }}>
              Email
            </label>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:iconColor("email"), transition:"color 0.2s", pointerEvents:"none" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                onChange={(e) => setemail(e.target.value)}
                style={inputStyle("email")}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:"10px" }}>
            <label style={{ display:"block", fontSize:"12px", fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"7px" }}>
              Password
            </label>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:iconColor("pass"), transition:"color 0.2s", pointerEvents:"none" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                placeholder="min. 8 characters"
                minLength="8"
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused("")}
                onChange={(e) => setpassword(e.target.value)}
                style={{ ...inputStyle("pass"), paddingRight:"46px" }}
              />
              <button
                onClick={() => setShowPass((p) => !p)}
                style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.3)", padding:0 }}
              >
                {showPass
                  ? <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                  : <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background:"rgba(253,71,63,0.12)", border:"1px solid rgba(253,71,63,0.3)", borderRadius:"12px", padding:"10px 14px", marginBottom:"14px", color:"#ff8a80", fontSize:"13px", fontWeight:600 }}>
              ⚠️ {error}
            </div>
          )}

          {/* CTA — Sign Up */}
          <button
            className="btn-fire"
            onClick={signuphandel}
            style={{ width:"100%", padding:"15px", borderRadius:"16px", color:"#fff", fontSize:"16px", fontWeight:800, cursor:"pointer", letterSpacing:"0.5px", marginTop:"18px", marginBottom:"14px", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}
          >
            ✨ Create Account
          </button>

          {/* Already have account */}
          <button
            onClick={() => nagivate("/login")}
            style={{ width:"100%", padding:"14px", borderRadius:"16px", background:"transparent", border:"1.5px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", fontSize:"15px", fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(253,71,63,0.5)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}
          >
            Already have an account? <span style={{ color:"#fd473f" }}>Sign In 🔥</span>
          </button>

          {/* T&C */}
          <p style={{ textAlign:"center", fontSize:"11px", color:"rgba(255,255,255,0.2)", marginTop:"20px", lineHeight:1.6 }}>
            By signing up, you agree to our{" "}
            <a href="#" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"underline" }}>Terms</a>
            {" & "}
            <a href="#" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"underline" }}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
