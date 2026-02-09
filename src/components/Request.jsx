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
  if (request.length === 0) return <h1>no request found</h1>;

  return (
    <div>
      <h1>Connection Request</h1>

      {request.map((req) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        } = req.fromUser._id;

        return (
          <div key={req._id}>
            <div>
              <img alt="" src={photoUrl} />
            </div>

            <div>
              <h2 className="font-medium text-lg">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm text-gray-600">
                  {age} • {gender}
                </p>
              )}

              {about && (
                <p className="text-sm text-gray-700 mt-1">
                  {about}
                </p>
              )}
            </div>

            <div>
              <button
                className="btn btn-active btn-primary"
                onClick={() => reviewRequest("rejected", req._id)}
              >
                Reject
              </button>

              <button
                className="btn btn-active btn-secondary"
                onClick={() => reviewRequest("accepted", req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
