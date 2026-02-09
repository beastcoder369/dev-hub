import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constents";
import { removeUserfeed } from "../utils/feedSlice";

axios.defaults.withCredentials = true;

const Usercard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

  const handleSendRequest = async (status, toUserId) => {
  try {
    await axios.post(
      `${BASE_URL}/request/send/${status}/${toUserId}`,
      { toUserId } // 🔥 ADD THIS
    );

    dispatch(removeUserfeed(toUserId));
  } catch (error) {
    console.error(
      "Send request failed:",
      error.response?.data || error.message
    );
  }
};


  return (
    <div className="flex justify-center p-10 m-6">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          {photoUrl && (
            <img
              src={photoUrl}
              alt="user"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}

          <h2 className="card-title">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p>
              {age} • {gender}
            </p>
          )}

          {about && <p>{about}</p>}

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignored
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => handleSendRequest("intrested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
