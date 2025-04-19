import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleRequests = async (requestId, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (res.errors) {
        console.error("Error:", res.errors[0].message);
        return;
      }
      dispatch(removeUserFromFeed(requestId));
    } catch (error) {
      console.error("Failed to review request:", error.message);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96 h-[540px] flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="avatar">
        <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={user?.photoUrl || "profile"}
            alt="profile"
            className="object-cover"
          />
        </div>
      </div>
      <h2 className="text-lg font-bold mt-4">
        {user.firstName} {user.lastName}
      </h2>
      {user.age && <p className="text-gray-500">Age: {user.age}</p>}
      {user.gender && <p className="text-gray-500">Gender: {user.gender}</p>}
      {user.skills && <p className="text-gray-500">Skills: {user.skills}</p>}
      {user.about && <p className="text-gray-500 text-center">{user.about}</p>}
      <div className="mt-4 flex gap-4">
        <button
          className="btn btn-error"
          onClick={() => {
            handleRequests(user._id, "ignored");
          }}
        >
          Ignored
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            handleRequests(user._id, "interested");
          }}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
