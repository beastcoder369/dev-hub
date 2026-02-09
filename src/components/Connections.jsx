import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connection",
        { withCredentials: true }
      );

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1> no connection found</h1>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Connections
        </h1>

        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            photoUrl,
            about,
          } = connection;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 p-4 mb-4 rounded-lg shadow-sm border"
            >
              <div>
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-16 h-16 rounded-full object-cover"
                />
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
