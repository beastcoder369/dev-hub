import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constents";

const Login = () => {
  const [email, setemail] = useState("");
  const [Password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId: email,
        password: Password, 
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data));
    navigate("/feed");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login Form</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter EmailId</legend>
            <input
              type="text"
              value={email}
              className="input"
              onChange={(e) => setemail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter Password</legend>
            <input
              type="text"
              value={Password}
              className="input"
              onChange={(e) => setpassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handlelogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
