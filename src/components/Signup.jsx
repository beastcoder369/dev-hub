import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constents";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
    const [fristname , setfristname] = useState("")
    const [lastname , setlastname] = useState("")
    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")
    const nagivate = useNavigate();
    const dispatch = useDispatch();

    const signuphandel = async ()=>{
        try{
            const signupdata = await axios.post(BASE_URL +"/signup",{
            firstName:fristname,
            lastName:lastname,
            emailId:email,
            password:password
        },{withCredentials:true})
        //  console.log(signupdata.data);
        nagivate("/login");
        dispatch(addUser(signupdata.data))
        }catch(error){
            console.error("details are not fetched ")
        }
    }
   
  return (
    <div className="flex justify-center p-6 m-10">
      <div className="card card-side bg-base-100 shadow-lg rounded-xl overflow-hidden max-w-3xl">
        
        <figure className="w-1/2 hidden md:block">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie"
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body gap-4">
          <h2 className="card-title text-2xl font-semibold text-center md:text-left">
            Sign Up here
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={fristname}
              onChange={(e)=> setfristname(e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e)=> setlastname(e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </g>
              </svg>
              <input
                type="email"
                placeholder="enter email "
                value={email}
                onChange={(e)=> setemail(e.target.value)}
                required
                className="grow"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                value={password}
                onChange={(e)=> setpassword(e.target.value)}
                className="grow"
              />
            </label>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary w-full md:w-auto" onClick={signuphandel}>
              Sign-Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
