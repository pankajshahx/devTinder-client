import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      console.log(res);
      dispatch(addFeed(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if ((feed || []).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No matching users found</h1>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {feed.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    )
  );
};

export default Feed;
