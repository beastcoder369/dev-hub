import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/request/reccived",
        { withCredentials: true }
      );
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return null;

  // ── extract user from request object ──
  // API shape: { _id, fromUserId: { _id, firstName, ... }, toUserId, status }
  const getUser = (req) => {
    if (!req) return null;
    // Primary: fromUserId is populated
    if (req.fromUserId && typeof req.fromUserId === "object" && req.fromUserId.firstName) {
      return req.fromUserId;
    }
    // Fallback: fromUser (older shape)
    if (req.fromUser && typeof req.fromUser === "object" && req.fromUser.firstName) {
      return req.fromUser;
    }
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-400px 0; }
          100% { background-position: 400px 0; }
        }

        /* ── Page ── */
        .rq-page {
          font-family: 'JetBrains Mono', monospace;
          min-height: calc(100vh - 52px);
          background: linear-gradient(145deg,#09090d 0%,#0d0709 50%,#09090d 100%);
          padding: 36px 16px 60px;
        }
        .rq-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .rq-eyebrow {
          font-size: 10px; color: rgba(244,63,94,0.65);
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;
        }
        .rq-title {
          font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800;
          color: #fff; margin: 0 0 5px; letter-spacing: -0.5px;
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        }
        .rq-count {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 24px; height: 24px; border-radius: 12px; padding: 0 7px;
          background: linear-gradient(135deg,#f43f5e,#fb923c);
          font-size: 11px; font-weight: 700; color: #fff;
          box-shadow: 0 0 12px rgba(244,63,94,0.45);
        }
        .rq-subtitle {
          font-size: 12px; color: rgba(255,255,255,0.28); margin: 0 0 32px;
        }

        /* ── Grid ── */
        .rq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        /* ── Card ── */
        .rq-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s, border-color .25s;
          animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both;
        }
        .rq-card:hover {
          transform: translateY(-4px);
          border-color: rgba(244,63,94,0.18);
          box-shadow: 0 20px 50px rgba(0,0,0,0.55);
        }

        /* Cover banner */
        .rq-cover {
          height: 80px;
          background: linear-gradient(135deg, #1a0a0d 0%, #1f0d06 50%, #0f0a1a 100%);
          position: relative;
          overflow: hidden;
        }
        .rq-cover-pattern {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(244,63,94,0.03) 0px,
            rgba(244,63,94,0.03) 1px,
            transparent 1px,
            transparent 20px
          );
        }
        .rq-cover-glow {
          position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
          width: 120px; height: 80px; border-radius: 50%;
          background: radial-gradient(circle, rgba(244,63,94,0.18) 0%, transparent 70%);
        }

        /* Avatar overlapping cover */
        .rq-avatar-area {
          padding: 0 20px;
          margin-top: -32px;
          position: relative;
          z-index: 1;
        }
        .rq-avatar-ring {
          width: 64px; height: 64px; border-radius: 16px;
          border: 3px solid #0e0b0f;
          overflow: hidden; flex-shrink: 0;
          background: linear-gradient(135deg,#f43f5e,#fb923c);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .rq-avatar-img { width:100%; height:100%; object-fit:cover; display:block; }
        .rq-avatar-init {
          font-family:'Syne',sans-serif; font-size:24px; font-weight:800; color:#fff;
        }

        /* Card body */
        .rq-card-body { padding: 12px 20px 20px; }
        .rq-user-name {
          font-family:'Syne',sans-serif; font-size:16px; font-weight:800;
          color:#fff; margin:0 0 3px;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }
        .rq-user-meta {
          font-size:11px; color:rgba(255,255,255,0.30);
          margin:0 0 8px; display:flex; align-items:center; gap:6px;
        }
        .rq-meta-dot { width:3px; height:3px; border-radius:50%; background:rgba(255,255,255,0.18); }
        .rq-user-about {
          font-size:11.5px; color:rgba(255,255,255,0.40); line-height:1.6;
          margin:0 0 14px;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
        }
        .rq-user-about::before { content:'// '; color:rgba(244,63,94,0.45); }

        /* Mutual / skill chips */
        .rq-chips { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:16px; }
        .rq-chip {
          font-size:10px; font-weight:600; padding:2px 8px; border-radius:20px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09);
          color:rgba(255,255,255,0.40);
        }
        .rq-chip:nth-child(odd)  { background:rgba(244,63,94,0.08); border-color:rgba(244,63,94,0.2); color:#fb7185; }
        .rq-chip:nth-child(even) { background:rgba(251,146,60,0.08); border-color:rgba(251,146,60,0.2); color:#fb923c; }

        /* Card divider */
        .rq-card-div { height:1px; background:rgba(255,255,255,0.06); margin:0 0 14px; }

        /* Card action buttons */
        .rq-card-btns { display:flex; gap:8px; }

        .rq-btn-reject {
          flex:1; padding:10px 0; border-radius:12px;
          background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.09);
          color:rgba(255,255,255,0.45); font-size:11.5px; font-weight:700;
          font-family:'JetBrains Mono',monospace; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:5px;
          transition:all .18s;
        }
        .rq-btn-reject:hover {
          background:rgba(239,68,68,0.10); border-color:rgba(239,68,68,0.30);
          color:#f87171; transform:translateY(-1px);
        }

        .rq-btn-accept {
          flex:1.6; padding:10px 0; border-radius:12px;
          background:linear-gradient(135deg,#f43f5e,#fb923c);
          border:none; color:#fff; font-size:11.5px; font-weight:700;
          font-family:'JetBrains Mono',monospace; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:5px;
          position:relative; overflow:hidden;
          box-shadow:0 4px 16px rgba(244,63,94,0.35);
          transition:transform .18s, box-shadow .18s;
        }
        .rq-btn-accept:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(244,63,94,0.52); }
        .rq-btn-accept::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.13),transparent);
          background-size:400px 100%; animation:shimmer 2.5s infinite;
        }

        /* ── Empty state ── */
        .rq-empty {
          text-align:center; padding:80px 24px;
          animation:fadeUp .4s cubic-bezier(.22,1,.36,1);
        }
        .rq-empty-icon {
          width:72px; height:72px; border-radius:22px; margin:0 auto 20px;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
        }
        .rq-empty-title {
          font-family:'Syne',sans-serif; font-size:20px; font-weight:800;
          color:rgba(255,255,255,0.45); margin:0 0 8px;
        }
        .rq-empty-sub { font-size:12px; color:rgba(255,255,255,0.20); margin:0; }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .rq-grid { grid-template-columns: 1fr; }
          .rq-title { font-size:22px; }
        }
        @media (min-width: 601px) and (max-width: 860px) {
          .rq-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="rq-page">
        <div className="rq-inner">

          {/* Header */}
          <p className="rq-eyebrow">// incoming</p>
          <h1 className="rq-title">
            Connection Requests
            {request?.length > 0 && (
              <span className="rq-count">{request.length}</span>
            )}
          </h1>
          <p className="rq-subtitle">developers who want to connect with you</p>

          {/* Empty */}
          {request.length === 0 ? (
            <div className="rq-empty">
              <div className="rq-empty-icon">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6z"/>
                </svg>
              </div>
              <p className="rq-empty-title">no requests yet</p>
              <p className="rq-empty-sub">// when developers find you, they'll appear here</p>
            </div>
          ) : (
            <div className="rq-grid">
              {request.map((req, i) => {
                const fromUser = getUser(req);
                if (!fromUser) return null;

                const {
                  firstName = "",
                  lastName  = "",
                  age, gender, about,
                  photoUrl,
                  skills,
                } = fromUser;

                const safePhoto = photoUrl && photoUrl.trim() ? photoUrl : null;

                const skillList = skills
                  ? (Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()).filter(Boolean))
                  : [];

                return (
                  <div
                    key={req._id}
                    className="rq-card"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    {/* Cover */}
                    <div className="rq-cover">
                      <div className="rq-cover-pattern" />
                      <div className="rq-cover-glow" />
                    </div>

                    {/* Avatar overlapping cover */}
                    <div className="rq-avatar-area">
                      <div className="rq-avatar-ring">
                        {safePhoto
                          ? <img src={safePhoto} alt={firstName} className="rq-avatar-img" />
                          : <span className="rq-avatar-init">
                              {firstName ? firstName[0].toUpperCase() : "?"}
                            </span>
                        }
                      </div>
                    </div>

                    {/* Body */}
                    <div className="rq-card-body">
                      <h2 className="rq-user-name">{firstName} {lastName}</h2>

                      {(age || gender) && (
                        <div className="rq-user-meta">
                          {age    && <span>{age} yrs</span>}
                          {age && gender && <span className="rq-meta-dot" />}
                          {gender && <span>{gender}</span>}
                        </div>
                      )}

                      {about && <p className="rq-user-about">{about}</p>}

                      {skillList.length > 0 && (
                        <div className="rq-chips">
                          {skillList.slice(0, 4).map((s, j) => (
                            <span key={j} className="rq-chip">{s}</span>
                          ))}
                          {skillList.length > 4 && (
                            <span className="rq-chip">+{skillList.length - 4}</span>
                          )}
                        </div>
                      )}

                      <div className="rq-card-div" />

                      <div className="rq-card-btns">
                        <button
                          className="rq-btn-reject"
                          onClick={() => reviewRequest("rejected", req._id)}
                        >
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                          reject
                        </button>
                        <button
                          className="rq-btn-accept"
                          onClick={() => reviewRequest("accepted", req._id)}
                        >
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                          accept
                        </button>
                      </div>
                    </div>
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

export default Request;
