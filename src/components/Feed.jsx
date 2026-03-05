import axios from "axios";
import { BASE_URL } from "../utils/constents";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Usercard from "./UserCard";
import EmptyFeed from "./EmptyFeed";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const userFeed = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );

    
      dispatch(addFeed(userFeed?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;
  if (feed.length === 0) return <EmptyFeed/>;

  return (
    <div>
      <Usercard user={feed[0]} />
    </div>
  );
};

export default Feed;