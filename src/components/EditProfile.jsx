import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constents";
import Usercard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [photoUrl, setphotoUrl] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState("");
  const [about, setabout] = useState("");
  const [skills, setskills] = useState("");
  const [showToast , setshowToast] = useState(false);
  const dispatch = useDispatch();

  const updateuserHandel = async () => {
    try {
      const updateuser = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName,
          lastName: lastName,
          photoUrl: photoUrl,
          gender: gender,
          age: age,
          about: about,
          skills: skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(updateuser?.data?.data));
      const i = setTimeout(() => {
        setshowToast(false)
        
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-10">
      <div className="card card-side bg-base-100 shadow-lg w-full lg:w-[520px]">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">Edit Your Profile Information</h2>

          <input value={firstName} type="text" placeholder="firstName" className="input" onChange={(e) => setfirstName(e.target.value)} />
          <input value={lastName} type="text" placeholder="lastName" className="input" onChange={(e) => setlastName(e.target.value)} />
          <input value={photoUrl} type="text" placeholder="photoUrl" className="input" onChange={(e) => setphotoUrl(e.target.value)} />
          <input value={gender} type="text" placeholder="gender" className="input" onChange={(e) => setgender(e.target.value)} />
          <input value={age} type="text" placeholder="age" className="input" onChange={(e) => setage(e.target.value)} />
          <input value={skills} type="text" placeholder="skills" className="input" onChange={(e) => setskills(e.target.value)} />
          <input value={about} type="text" placeholder="about" className="input" onChange={(e) => setabout(e.target.value)} />

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={updateuserHandel}>
              Update
            </button>
          </div>
        </div>
      </div>

      <Usercard
        user={{
          firstName,
          lastName,
          photoUrl: photoUrl || null,
          gender,
          age,
          about,
        }}
        
      />
      {showToast && (
        <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Update successfully.</span>
  </div>
</div>
      )}
    </div>
  );
};

export default EditProfile;
