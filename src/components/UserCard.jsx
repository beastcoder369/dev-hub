import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constents";
import { removeUserfeed } from "../utils/feedSlice";

axios.defaults.withCredentials = true;

const Usercard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;

  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = user;

  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`, { toUserId });
      dispatch(removeUserfeed(toUserId));
    } catch (error) {
      console.error("Send request failed:", error.response?.data || error.message);
    }
  };

  /* Parse skills string or array */
  const skillList = skills
    ? (Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()).filter(Boolean))
    : [];

  const genderIcon = gender === "female" ? "♀" : gender === "male" ? "♂" : "◈";

  return (
    <div className="flex justify-center">
      <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes cardIn  { from{opacity:0;transform:translateY(20px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(244,63,94,.5)} 60%{box-shadow:0 0 0 10px rgba(244,63,94,0)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        .uc-card {
          font-family: 'JetBrains Mono', monospace;
          animation: cardIn .45s cubic-bezier(.22,1,.36,1) both;
          width: 340px;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #0e0b0f;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 64px rgba(0,0,0,.7), 0 0 0 1px rgba(244,63,94,0.08);
          transition: transform .25s, box-shadow .25s;
        }
        .uc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 80px rgba(0,0,0,.75), 0 0 0 1px rgba(244,63,94,0.15);
        }

        /* Photo area */
        .uc-photo-wrap {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        .uc-photo {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .4s;
        }
        .uc-card:hover .uc-photo { transform: scale(1.04); }

        /* Gradient overlay on photo */
        .uc-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0) 35%,
            rgba(14,11,15,0.6) 65%,
            rgba(14,11,15,1) 100%
          );
        }

        /* No-photo placeholder */
        .uc-no-photo {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, #1a0f0f, #0e0b0f);
        }
        .uc-avatar-ring {
          width: 100px; height: 100px; border-radius: 50%;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px; font-weight: 800;
          color: white; font-family: 'Syne', sans-serif;
          box-shadow: 0 0 32px rgba(244,63,94,0.5);
          animation: pulse 2.5s infinite;
        }

        /* Badges on photo */
        .uc-status-badge {
          position: absolute; top: 14px; right: 14px;
          background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border-radius: 20px; padding: 4px 10px;
          font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.7);
          display: flex; align-items: center; gap: 5px;
          font-family: 'JetBrains Mono', monospace;
        }
        .uc-online-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.8);
        }

        /* Code line decoration on photo */
        .uc-code-tag {
          position: absolute; top: 14px; left: 14px;
          background: rgba(244,63,94,0.18); border: 1px solid rgba(244,63,94,0.35);
          backdrop-filter: blur(10px);
          border-radius: 8px; padding: 4px 10px;
          font-size: 10px; font-weight: 700; color: #fb7185;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Body */
        .uc-body { padding: 18px 20px 20px; }

        .uc-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 800;
          color: #fff; margin: 0 0 4px;
          letter-spacing: -0.3px;
          line-height: 1.1;
        }
        .uc-meta {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
        }
        .uc-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.2); }

        .uc-about {
          font-size: 12px; color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .uc-about::before {
          content: '// ';
          color: rgba(244,63,94,0.5);
        }

        /* Skills */
        .uc-skills { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 16px; }
        .uc-skill {
          font-size: 10px; font-weight: 600;
          padding: 3px 9px; border-radius: 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.45);
          transition: all .15s;
        }
        .uc-skill:nth-child(3n+1) { background:rgba(244,63,94,0.08); border-color:rgba(244,63,94,0.2); color:#fb7185; }
        .uc-skill:nth-child(3n+2) { background:rgba(251,146,60,0.08); border-color:rgba(251,146,60,0.2); color:#fb923c; }

        /* Divider */
        .uc-div { height: 1px; background: rgba(255,255,255,0.06); margin: 0 0 16px; }

        /* Action buttons */
        .uc-actions { display: flex; gap: 10px; }

        .uc-btn-ignore {
          flex: 1; padding: 12px 0; border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.45);
          font-size: 12px; font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .uc-btn-ignore:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
          transform: translateY(-1px);
        }

        .uc-btn-interest {
          flex: 1.4; padding: 12px 0; border-radius: 14px;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          border: none;
          color: #fff;
          font-size: 12px; font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 20px rgba(244,63,94,0.40);
          transition: transform .2s, box-shadow .2s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .uc-btn-interest:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(244,63,94,0.55);
        }
        .uc-btn-interest::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent);
          background-size:400px 100%;
          animation: shimmer 2.5s infinite;
        }
      `}</style>

      <div className="uc-card">

        {/* ── Photo / Placeholder ── */}
        <div className="uc-photo-wrap">
          {photoUrl ? (
            <>
              <img src={photoUrl} alt={`${firstName}`} className="uc-photo" />
              <div className="uc-photo-overlay" />
            </>
          ) : (
            <div className="uc-no-photo">
              <div className="uc-avatar-ring">
                {firstName ? firstName[0].toUpperCase() : "?"}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="uc-code-tag">&lt;dev /&gt;</div>
          <div className="uc-status-badge">
            <span className="uc-online-dot" />
            online
          </div>
        </div>

        {/* ── Body ── */}
        <div className="uc-body">

          {/* Name + meta */}
          <h2 className="uc-name">
            {firstName || "Anonymous"} {lastName || ""}
          </h2>

          {(age || gender) && (
            <div className="uc-meta">
              {age && <span>{age} yrs</span>}
              {age && gender && <span className="uc-meta-dot" />}
              {gender && <span>{genderIcon} {gender}</span>}
            </div>
          )}

          {/* About */}
          {about && <p className="uc-about">{about}</p>}

          {/* Skills */}
          {skillList.length > 0 && (
            <div className="uc-skills">
              {skillList.slice(0, 5).map((s, i) => (
                <span key={i} className="uc-skill">{s}</span>
              ))}
              {skillList.length > 5 && (
                <span className="uc-skill">+{skillList.length - 5}</span>
              )}
            </div>
          )}

          <div className="uc-div" />

          {/* Action buttons — only show if _id exists (not edit preview) */}
          {_id ? (
            <div className="uc-actions">
              <button className="uc-btn-ignore" onClick={() => handleSendRequest("ignored", _id)}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                skip
              </button>
              <button className="uc-btn-interest" onClick={() => handleSendRequest("intrested", _id)}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                interested
              </button>
            </div>
          ) : (
            /* Edit profile preview — no action buttons */
            <div style={{ textAlign: "center", fontSize: "10px", color: "rgba(255,255,255,0.18)", fontFamily: "'JetBrains Mono',monospace", padding: "4px 0" }}>
              // preview mode
            </div>
          )}
        </div>
      </div>
    </>
    </div>
  );
};

export default Usercard;
