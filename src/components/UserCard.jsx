import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, age, gender, photoUrl } = user;
  return (
    <div className="flex justify-center items-center my-20 f">
      <div className="card bg-base-400 w-96 shadow-sm p-2">
        <figure>
          <img src={photoUrl} alt="profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName}
            <div className="badge badge-success">NEW</div>
          </h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          {about && <p>{about}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
