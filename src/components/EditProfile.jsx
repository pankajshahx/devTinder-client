import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";

const ALLOWED_DATA = [
  "firstName",
  "lastName",
  "age",
  "skills",
  "gender",
  "photoUrl",
  "about",
];

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(
    ALLOWED_DATA.reduce((acc, key) => {
      if (key === "age") {
        acc[key] = Number(user?.[key]) || "";
      } else if (key === "skills") {
        acc[key] = Array.isArray(user?.[key])
          ? user[key].join(", ")
          : user?.[key] || "";
      } else {
        acc[key] = user?.[key] || "";
      }
      return acc;
    }, {})
  );

  const handleChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: key === "age" ? Number(value) : value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        ...profileData,
        age: Number(profileData.age),
        skills: profileData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean), // remove empty strings
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });

      console.log("Profile updated:", res.data);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 flex flex-col">
        <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>
        <div className="space-y-4">
          {ALLOWED_DATA.map((key) =>
            key === "gender" ? (
              <select
                key={key}
                value={profileData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                key={key}
                type={key === "age" ? "number" : "text"}
                value={profileData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="input input-bordered w-full"
                placeholder={
                  key === "skills"
                    ? "e.g. React, Node, MongoDB"
                    : key.charAt(0).toUpperCase() + key.slice(1)
                }
              />
            )
          )}
        </div>
        <button onClick={handleUpdateProfile} className="mt-4 btn btn-primary">
          Save Profile
        </button>
      </div>
      <UserCard
        user={{
          ...profileData,
          skills: profileData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }}
      />
    </div>
  );
};

export default EditProfile;
