import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer.jsx";
import { BASE_URL } from "../utils/constents.jsx";
import { addUser } from "../utils/userSlice.jsx";

axios.defaults.withCredentials = true;

const Body = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const userData  = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true); // ← key: start as true

  const fetchUser = async () => {
    if (userData) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`);
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Fetch user error:", error);
    } finally {
      setLoading(false); // ← always stop loading when done
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // While checking auth — show dark screen, not a redirect
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(145deg, #09090d 0%, #0d0709 40%, #09090d 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px", height: "40px", borderRadius: "12px", margin: "0 auto 16px",
              background: "linear-gradient(135deg, #f43f5e, #fb923c, #fbbf24)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(244,63,94,0.5)",
              animation: "spin 1s linear infinite",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 900, fontSize: "14px" }}>&lt;/&gt;</span>
          </div>
          <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", fontFamily: "'JetBrains Mono',monospace" }}>
            // initializing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(145deg, #09090d 0%, #0d0709 40%, #09090d 100%)",
      }}
    >
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
