import { useState } from "react";
import axios from "axios"

const Login = () => {

  const [email , setemail] = useState("");
  const [Password , setpassword] = useState("");

  const handlelogin = async ()=>{
    try{
      const res = await axios.post("http://localhost:3000/login",{
        emailId,
        Password,
      },{withCredentials:true})
    }catch(error){
      console.error(error);
    }
  }
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" /> */}
  </figure>
  <div className="card-body">
    <h2 className="card-title">Login Form</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter EmailId</legend>
  <input type="text" value={email} className="input" onChange={(e)=>setemail(e.target.value)}  />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Enter Password</legend>
  <input type="text" value={Password} className="input" onChange={(e)=>setpassword(e.target.value)} />
</fieldset>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handlelogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Login;
