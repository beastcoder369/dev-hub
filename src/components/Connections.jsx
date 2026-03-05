import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connection",
        { withCredentials: true }
      );

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error("❌ fetch error:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .cn-page {
          font-family: 'JetBrains Mono', monospace;
          min-height: calc(100vh - 52px);
          background: linear-gradient(145deg, #09090d 0%, #0d0709 50%, #09090d 100%);
          padding: 40px 16px 60px;
        }
        .cn-inner { max-width: 720px; margin: 0 auto; }

        .cn-eyebrow { font-size: 10px; color: rgba(244,63,94,0.65); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px; }
        .cn-title {
          font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800;
          color: #fff; margin: 0 0 5px; letter-spacing: -0.5px;
          display: flex; align-items: center; gap: 10px;
        }
        .cn-count {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 24px; height: 24px; border-radius: 12px; padding: 0 7px;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          font-size: 11px; font-weight: 700; color: #fff;
          box-shadow: 0 0 12px rgba(244,63,94,0.4);
        }
        .cn-subtitle { font-size: 12px; color: rgba(255,255,255,0.28); margin: 0 0 32px; }

        .cn-empty {
          text-align: center; padding: 80px 24px;
          animation: fadeUp .4s cubic-bezier(.22,1,.36,1);
        }
        .cn-empty-icon {
          width: 72px; height: 72px; border-radius: 22px; margin: 0 auto 20px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
        }
        .cn-empty-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: rgba(255,255,255,0.4); margin: 0 0 8px; }
        .cn-empty-sub   { font-size: 12px; color: rgba(255,255,255,0.20); margin: 0; }

        .cn-list { display: flex; flex-direction: column; gap: 10px; }

        .cn-row {
          display: flex; align-items: center; gap: 16px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 16px 20px;
          transition: transform .22s, border-color .22s, background .22s;
          animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both;
          position: relative; overflow: hidden;
        }
        .cn-row::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(180deg, #f43f5e, #fb923c);
          opacity: 0; border-radius: 0 2px 2px 0;
          transition: opacity .22s;
        }
        .cn-row:hover {
          transform: translateX(4px);
          background: rgba(255,255,255,0.04);
          border-color: rgba(244,63,94,0.15);
        }
        .cn-row:hover::before { opacity: 1; }

        .cn-avatar-wrap { position: relative; flex-shrink: 0; }
        .cn-avatar {
          width: 58px; height: 58px; border-radius: 16px;
          object-fit: cover; display: block;
          border: 2px solid rgba(244,63,94,0.25);
          transition: border-color .22s;
        }
        .cn-row:hover .cn-avatar { border-color: rgba(244,63,94,0.5); }
        .cn-avatar-fallback {
          width: 58px; height: 58px; border-radius: 16px;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #fff;
          border: 2px solid rgba(244,63,94,0.3);
        }
        .cn-online {
          position: absolute; bottom: -2px; right: -2px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #22c55e; border: 2px solid #09090d;
          box-shadow: 0 0 6px rgba(34,197,94,0.6);
        }

        .cn-info { flex: 1; min-width: 0; }
        .cn-name {
          font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800;
          color: #fff; margin: 0 0 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cn-meta {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: rgba(255,255,255,0.30); margin-bottom: 6px;
        }
        .cn-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.18); display: inline-block; }
        .cn-about {
          font-size: 11.5px; color: rgba(255,255,255,0.38); line-height: 1.55; margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cn-about::before { content: '// '; color: rgba(244,63,94,0.45); }

        .cn-skills { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
        .cn-skill {
          font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 20px;
          background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.2); color: #fb7185;
        }
        .cn-skill:nth-child(even) {
          background: rgba(251,146,60,0.08); border-color: rgba(251,146,60,0.2); color: #fb923c;
        }

        .cn-tag {
          flex-shrink: 0;
          font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px;
          background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2);
          color: #4ade80; display: flex; align-items: center; gap: 5px;
        }
        .cn-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; }

        .cn-msg-btn {
          flex-shrink: 0; width: 36px; height: 36px; border-radius: 12px;
          background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.40);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .18s;
        }
        .cn-msg-btn:hover {
          background: rgba(244,63,94,0.10); border-color: rgba(244,63,94,0.30);
          color: #fb7185; transform: scale(1.08);
        }

        @media (max-width: 500px) {
          .cn-tag  { display: none; }
          .cn-row  { padding: 12px 14px; gap: 12px; }
          .cn-name { font-size: 14px; }
        }
      `}</style>

      <div className="cn-page">
        <div className="cn-inner">

          <p className="cn-eyebrow">// network</p>
          <h1 className="cn-title">
            My Connections
            {connections.length > 0 && (
              <span className="cn-count">{connections.length}</span>
            )}
          </h1>
          <p className="cn-subtitle">developers you've connected with</p>

          {connections.length === 0 ? (
            <div className="cn-empty">
              <div className="cn-empty-icon">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <p className="cn-empty-title">no connections yet</p>
              <p className="cn-empty-sub">// accept requests to grow your dev network</p>
            </div>
          ) : (
            <div className="cn-list">
              {connections.map((connection, i) => {
                // ✅ API returns user data directly on each connection object
                const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = connection;
                const safePhoto = photoUrl && photoUrl.trim() ? photoUrl : null;
                const skillList = Array.isArray(skills) ? skills : [];

                return (
                  <div
                    key={_id ?? i}
                    className="cn-row"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {/* Avatar */}
                    <div className="cn-avatar-wrap">
                      {safePhoto
                        ? <img src={safePhoto} alt={firstName || "user"} className="cn-avatar" />
                        : <div className="cn-avatar-fallback">{firstName?.[0]?.toUpperCase() || "?"}</div>
                      }
                      <span className="cn-online" />
                    </div>

                    {/* Info */}
                    <div className="cn-info">
                      <h2 className="cn-name">{firstName} {lastName}</h2>

                      {(age || gender) && (
                        <div className="cn-meta">
                          {age    && <span>{age} yrs</span>}
                          {age && gender && <span className="cn-meta-sep" />}
                          {gender && <span>{gender}</span>}
                        </div>
                      )}

                      {about && <p className="cn-about">{about}</p>}

                      {skillList.length > 0 && (
                        <div className="cn-skills">
                          {skillList.slice(0, 4).map((s, j) => (
                            <span key={j} className="cn-skill">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Connected badge */}
                    <div className="cn-tag">
                      <span className="cn-tag-dot" />
                      connected
                    </div>

                    {/* Message icon */}
                    <button className="cn-msg-btn" title="Message">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Connections;
