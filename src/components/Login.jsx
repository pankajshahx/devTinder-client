import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("pankaj@example.com");
  const [password, setPassword] = useState("Pankaj@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signin",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data?.data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Log In</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Write your email</legend>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                value={email}
                className="input"
                placeholder="Email..."
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Write your password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
