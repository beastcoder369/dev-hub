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
  const [showToast, setshowToast] = useState(false);
  const [error, seterror] = useState("");

  const dispatch = useDispatch();

  const updateuserHandel = async () => {
    try {
      seterror("");

      const updateuser = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          age: age ? Number(age) : undefined,
          about,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(updateuser.data.data));
      setshowToast(true);

      setTimeout(() => {
        setshowToast(false);
      }, 4000);
    } catch (err) {
      seterror(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-10">
      <div className="card card-side bg-base-100 shadow-lg w-full lg:w-[520px]">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="profile"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">Edit Your Profile Information</h2>

          <input value={firstName} className="input" placeholder="firstName" onChange={(e) => setfirstName(e.target.value)} />
          <input value={lastName} className="input" placeholder="lastName" onChange={(e) => setlastName(e.target.value)} />
          <input value={photoUrl} className="input" placeholder="photoUrl" onChange={(e) => setphotoUrl(e.target.value)} />
          <input value={gender} className="input" placeholder="gender" onChange={(e) => setgender(e.target.value)} />
          <input value={age} className="input" placeholder="age" onChange={(e) => setage(e.target.value)} />
          <input value={skills} className="input" placeholder="skills" onChange={(e) => setskills(e.target.value)} />
          <input value={about} className="input" placeholder="about" onChange={(e) => setabout(e.target.value)} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
