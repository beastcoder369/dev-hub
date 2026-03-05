const EmptyFeed = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-10px); }
        }
        @keyframes pulse {
          0%,100% { opacity:0.4; transform:scale(1); }
          50%     { opacity:0.8; transform:scale(1.08); }
        }
        @keyframes shimmer {
          0%   { background-position:-400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(54px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(54px) rotate(-360deg); }
        }

        .ef-wrap {
          font-family: 'JetBrains Mono', monospace;
          min-height: calc(100vh - 52px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          background: linear-gradient(145deg, #09090d 0%, #0d0709 50%, #09090d 100%);
        }

        .ef-card {
          text-align: center;
          max-width: 420px;
          width: 100%;
          animation: fadeUp .5s cubic-bezier(.22,1,.36,1);
        }

        /* Icon area */
        .ef-icon-wrap {
          position: relative;
          width: 110px; height: 110px;
          margin: 0 auto 32px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Outer glow ring */
        .ef-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1.5px dashed rgba(244,63,94,0.2);
          animation: pulse 3s ease-in-out infinite;
        }

        /* Center icon box */
        .ef-icon-box {
          width: 72px; height: 72px; border-radius: 22px;
          background: linear-gradient(135deg, rgba(244,63,94,0.12), rgba(251,146,60,0.08));
          border: 1.5px solid rgba(244,63,94,0.2);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(244,63,94,0.12);
          animation: floatY 3.5s ease-in-out infinite;
          position: relative; z-index: 1;
        }

        /* Orbiting dot */
        .ef-orbit-dot {
          position: absolute;
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          box-shadow: 0 0 8px rgba(244,63,94,0.7);
          animation: orbit 4s linear infinite;
          top: 50%; left: 50%;
          margin-top: -4px; margin-left: -4px;
        }
        .ef-orbit-dot:nth-child(2) {
          animation-delay: -2s;
          background: linear-gradient(135deg, #fb923c, #fbbf24);
          box-shadow: 0 0 8px rgba(251,146,60,0.7);
        }

        /* Text */
        .ef-eyebrow {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(244,63,94,0.6); margin-bottom: 10px;
        }
        .ef-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px; font-weight: 800;
          color: #fff; margin: 0 0 12px; letter-spacing: -0.4px;
          line-height: 1.15;
        }
        .ef-title span {
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ef-subtitle {
          font-size: 12px; color: rgba(255,255,255,0.30);
          line-height: 1.7; margin: 0 0 32px;
        }
        .ef-subtitle::before { content: '// '; color: rgba(244,63,94,0.4); }

        /* Divider */
        .ef-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px;
        }
        .ef-divider-line { flex:1; height:1px; background: rgba(255,255,255,0.06); }
        .ef-divider-text { font-size: 10px; color: rgba(255,255,255,0.2); }

        /* Suggestions */
        .ef-tips {
          display: flex; flex-direction: column; gap: 8px;
          margin-bottom: 32px;
        }
        .ef-tip {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px; padding: 10px 14px;
          font-size: 11px; color: rgba(255,255,255,0.35);
          text-align: left;
        }
        .ef-tip-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.15);
        }

        /* CTA button */
        .ef-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 14px;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          border: none; color: #fff;
          font-size: 12px; font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 6px 24px rgba(244,63,94,0.4);
          transition: transform .2s, box-shadow .2s;
          text-decoration: none;
        }
        .ef-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(244,63,94,0.55);
        }
        .ef-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.13),transparent);
          background-size:400px 100%; animation:shimmer 2.5s infinite;
        }
      `}</style>

      <div className="ef-wrap">
        <div className="ef-card">

          {/* Animated icon */}
          <div className="ef-icon-wrap">
            <div className="ef-ring" />
            <div className="ef-orbit-dot" />
            <div className="ef-orbit-dot" />
            <div className="ef-icon-box">
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="url(#grad)" strokeWidth="1.5">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f43f5e"/>
                    <stop offset="100%" stopColor="#fb923c"/>
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
          </div>

          {/* Text */}
          <p className="ef-eyebrow">// feed.empty</p>
          <h1 className="ef-title">No <span>developers</span><br />in your feed</h1>
          <p className="ef-subtitle">you've seen everyone for now. check back later or update your profile to find better matches</p>

          <div className="ef-divider">
            <div className="ef-divider-line" />
            <span className="ef-divider-text">while you wait</span>
            <div className="ef-divider-line" />
          </div>

          {/* Tips */}
          <div className="ef-tips">
            <div className="ef-tip">
              <div className="ef-tip-icon">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fb7185" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              complete your profile to get more visibility
            </div>
            <div className="ef-tip">
              <div className="ef-tip-icon">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fb923c" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              add your skills to match with the right devs
            </div>
            <div className="ef-tip">
              <div className="ef-tip-icon">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fbbf24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              new developers join every day — check back soon
            </div>
          </div>

          {/* CTA */}
          <a href="/profile" className="ef-btn">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            update your profile
          </a>

        </div>
      </div>
    </>
  );
};

export default EmptyFeed;
