import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import NavBar from "./NavBar";
import Footer from "./Footer.jsx";
import { BASE_URL } from "../utils/constents.jsx";
import { addUser } from "../utils/userSlice.jsx";

axios.defaults.withCredentials = true;

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(`${BASE_URL}/profile/view`);
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Fetch user error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
