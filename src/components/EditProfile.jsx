import React, { useState } from "react";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  console.log(user?.firstName);
  const [age, setAge] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  return (
    <div className="flex justify-center m-4">
      <div className="flex justify-center items-center my-20 me-4">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Log In</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your First Name
                </legend>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="Firs tName .."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  What is your Last Name
                </legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name ..."
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your age</legend>
                <input
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  type="number"
                  value={age}
                  className="input"
                  placeholder="Age .."
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Update profile photo
                </legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Provide photo url..."
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{
          firstName,
          lastName,
          age,
          photoUrl,
        }}
      />
    </div>
  );
};

export default EditProfile;
