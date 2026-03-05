import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constents";
import Usercard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName,  setlastName]  = useState("");
  const [photoUrl,  setphotoUrl]  = useState("");
  const [gender,    setgender]    = useState("");
  const [age,       setage]       = useState("");
  const [about,     setabout]     = useState("");
  const [skills,    setskills]    = useState("");
  const [showToast, setshowToast] = useState(false);
  const [error,     seterror]     = useState("");
  const [focused,   setFocused]   = useState("");
  const [loading,   setLoading]   = useState(false);

  const dispatch = useDispatch();

  const updateuserHandel = async () => {
    try {
      setLoading(true);
      seterror("");
      const updateuser = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, gender, age: age ? Number(age) : undefined, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(updateuser.data.data));
      setshowToast(true);
      setTimeout(() => setshowToast(false), 4000);
    } catch (err) {
      seterror(err?.response?.data?.message || err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inp = (key) => ({
    width: "100%",
    padding: "11px 14px 11px 40px",
    borderRadius: "12px",
    background: focused === key ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: `1.5px solid ${focused === key ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"}`,
    boxShadow: focused === key ? "0 0 0 3px rgba(244,63,94,0.10)" : "none",
    color: "#fff",
    fontSize: "13px",
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
  });

  const ic = (k) => focused === k ? "#f43f5e" : "rgba(255,255,255,0.25)";

  const Label = ({ children }) => (
    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", fontWeight: 600 }}>
      {children}
    </p>
  );

  const IconWrap = ({ k, children }) => (
    <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: ic(k), transition: "color 0.2s", pointerEvents: "none" }}>
      {children}
    </span>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes toastPop{ from{opacity:0;transform:translateX(-50%) translateY(-10px) scale(.95)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
        @keyframes spin    { to{transform:rotate(360deg)} }

        .ep-page  { font-family:'JetBrains Mono',monospace; min-height:100vh; background:linear-gradient(145deg,#09090d 0%,#0d0709 50%,#09090d 100%); padding:40px 16px; }
        .ep-syne  { font-family:'Syne',sans-serif; }
        .ep-card  { animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:20px; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,.55); }
        .ep-prev  { animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .12s both; }

        .ep-save {
          width:100%; padding:13px; border-radius:12px; border:none; color:#fff;
          font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700;
          letter-spacing:.5px; cursor:pointer; position:relative; overflow:hidden;
          background:linear-gradient(135deg,#f43f5e,#fb923c);
          box-shadow:0 4px 20px rgba(244,63,94,.4);
          transition:transform .15s, box-shadow .2s, opacity .2s;
        }
        .ep-save:hover:not(:disabled){ transform:translateY(-2px); box-shadow:0 8px 28px rgba(244,63,94,.55); }
        .ep-save:active:not(:disabled){ transform:translateY(0); }
        .ep-save:disabled{ opacity:.55; cursor:not-allowed; }
        .ep-save::after{
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
          background-size:400px 100%; animation:shimmer 2.5s infinite;
        }

        .ep-select{
          width:100%; padding:11px 14px; border-radius:12px;
          background:rgba(255,255,255,.04); border:1.5px solid rgba(255,255,255,.08);
          color:rgba(255,255,255,.55); font-family:'JetBrains Mono',monospace;
          font-size:13px; outline:none; transition:all .2s; cursor:pointer; box-sizing:border-box;
          appearance:none; -webkit-appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 12px center;
        }
        .ep-select:focus{ border-color:rgba(244,63,94,.55); box-shadow:0 0 0 3px rgba(244,63,94,.10); background-color:rgba(255,255,255,.07); color:#fff; }
        .ep-select option{ background:#1a1014; color:#fff; }

        .ep-textarea{
          width:100%; padding:12px 14px; border-radius:12px;
          background:rgba(255,255,255,.04); border:1.5px solid rgba(255,255,255,.08);
          color:#fff; font-family:'JetBrains Mono',monospace; font-size:13px;
          outline:none; resize:none; transition:all .2s; box-sizing:border-box;
        }
        .ep-textarea::placeholder{ color:rgba(255,255,255,.20); }
        .ep-textarea:focus{ border-color:rgba(244,63,94,.55); box-shadow:0 0 0 3px rgba(244,63,94,.10); background:rgba(255,255,255,.07); }

        .skill-chip{ display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px; font-size:10px; font-weight:600; background:rgba(244,63,94,.10); border:1px solid rgba(244,63,94,.22); color:#fb7185; }
        .ep-spinner{ animation:spin .7s linear infinite; }
        .ep-divider{ height:1px; background:rgba(255,255,255,.06); margin:4px 0; }
        .ep-toast{
          position:fixed; top:20px; left:50%; z-index:9999;
          display:flex; align-items:center; gap:10px;
          padding:12px 20px; border-radius:16px;
          background:rgba(16,185,129,.12); border:1px solid rgba(16,185,129,.30);
          color:#34d399; font-size:13px; font-weight:600;
          backdrop-filter:blur(20px); box-shadow:0 8px 32px rgba(0,0,0,.4);
          font-family:'JetBrains Mono',monospace;
          animation:toastPop .28s cubic-bezier(.22,1,.36,1);
        }
        .ep-error{
          display:flex; align-items:center; gap:8px; padding:10px 14px;
          border-radius:12px; font-size:12px; font-weight:500;
          background:rgba(244,63,94,.08); border:1px solid rgba(244,63,94,.22); color:#fb7185;
        }
      `}</style>

      <div className="ep-page">
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

          {/* ── Page header ── */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "10px", color: "rgba(244,63,94,0.65)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'JetBrains Mono',monospace" }}>
              // profile.edit
            </p>
            <h1 className="ep-syne" style={{ fontSize: "26px", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.5px" }}>
              Edit Your Profile
            </h1>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", marginTop: "4px", fontFamily: "'JetBrains Mono',monospace" }}>
              keep your dev identity sharp and up to date
            </p>
          </div>

          {/* ── Main layout ── */}
          <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* ── FORM CARD ── */}
            <div className="ep-card" style={{ flex: "1", minWidth: "320px" }}>

              {/* Card top bar */}
              <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg,#f43f5e,#fb923c)", boxShadow: "0 0 14px rgba(244,63,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="ep-syne" style={{ fontSize: "13px", fontWeight: 800, color: "#fff", margin: 0 }}>profile info</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>update your public details</p>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#f43f5e", "#fb923c", "#22c55e"].map(c => (
                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.55 }} />
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* First + Last name */}
                <div style={{ display: "flex", gap: "14px" }}>
                  {[
                    { k: "fn", label: "first name", val: firstName, set: setfirstName, ph: "John" },
                    { k: "ln", label: "last name",  val: lastName,  set: setlastName,  ph: "Doe"  },
                  ].map(f => (
                    <div key={f.k} style={{ flex: 1 }}>
                      <Label>{f.label}</Label>
                      <div style={{ position: "relative" }}>
                        <IconWrap k={f.k}>
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        </IconWrap>
                        <input type="text" value={f.val} placeholder={f.ph} onFocus={() => setFocused(f.k)} onBlur={() => setFocused("")} onChange={e => f.set(e.target.value)} style={inp(f.k)} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Photo URL */}
                <div>
                  <Label>photo url</Label>
                  <div style={{ position: "relative" }}>
                    <IconWrap k="photo">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </IconWrap>
                    <input type="url" value={photoUrl} placeholder="https://your-photo.com/avatar.jpg" onFocus={() => setFocused("photo")} onBlur={() => setFocused("")} onChange={e => setphotoUrl(e.target.value)} style={inp("photo")} />
                  </div>
                  {photoUrl && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                      <img src={photoUrl} alt="preview" style={{ width: "28px", height: "28px", borderRadius: "8px", objectFit: "cover", border: "1.5px solid rgba(244,63,94,0.35)" }} onError={e => e.target.style.display = "none"} />
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono',monospace" }}>photo preview</span>
                    </div>
                  )}
                </div>

                {/* Age + Gender */}
                <div style={{ display: "flex", gap: "14px" }}>
                  <div style={{ flex: 1 }}>
                    <Label>age</Label>
                    <div style={{ position: "relative" }}>
                      <IconWrap k="age">
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </IconWrap>
                      <input type="number" value={age} placeholder="25" min="1" max="100" onFocus={() => setFocused("age")} onBlur={() => setFocused("")} onChange={e => setage(e.target.value)} style={inp("age")} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Label>gender</Label>
                    <select value={gender} onChange={e => setgender(e.target.value)} className="ep-select">
                      <option value="">select...</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label>skills <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "9px" }}>(comma separated)</span></Label>
                  <div style={{ position: "relative" }}>
                    <IconWrap k="skills">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    </IconWrap>
                    <input type="text" value={skills} placeholder="React, Node.js, TypeScript..." onFocus={() => setFocused("skills")} onBlur={() => setFocused("")} onChange={e => setskills(e.target.value)} style={inp("skills")} />
                  </div>
                  {skills && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                      {skills.split(",").map(s => s.trim()).filter(Boolean).map((s, i) => (
                        <span key={i} className="skill-chip">{s}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* About */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <Label>about</Label>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.20)", fontFamily: "'JetBrains Mono',monospace" }}>{about.length} chars</span>
                  </div>
                  <textarea
                    value={about}
                    placeholder="// tell the world who you are as a developer..."
                    rows={3}
                    onFocus={() => setFocused("about")}
                    onBlur={() => setFocused("")}
                    onChange={e => setabout(e.target.value)}
                    className="ep-textarea"
                    style={{
                      border: `1.5px solid ${focused === "about" ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: focused === "about" ? "0 0 0 3px rgba(244,63,94,0.10)" : "none",
                      background: focused === "about" ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                    }}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="ep-error">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    {error}
                  </div>
                )}

                <div className="ep-divider" />

                {/* Save button */}
                <button className="ep-save" onClick={updateuserHandel} disabled={loading}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <svg className="ep-spinner" width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="4"/>
                        <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      saving...
                    </span>
                  ) : "→ save changes"}
                </button>

              </div>
            </div>

            {/* ── PREVIEW ── */}
            <div className="ep-prev" style={{ width: "280px", flexShrink: 0 }}>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", letterSpacing: "2.5px", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace", marginBottom: "12px", fontWeight: 600 }}>
                // live preview
              </p>
              <Usercard user={{ firstName, lastName, photoUrl: photoUrl || null, gender, age, about }} />
            </div>

          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="ep-toast">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          profile updated successfully
        </div>
      )}
    </>
  );
};

export default EditProfile;
