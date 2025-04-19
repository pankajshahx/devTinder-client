import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedInForm, setIsLoggedInForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (!isLoggedInForm) {
        const res = await axios.post(
          BASE_URL + "/signup",
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
          { withCredentials: true }
        );
        setIsLoggedInForm(true);
        console.log(res);
      } else {
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoggedInForm ? "Log In" : "Sign Up"}
          </h2>
          <div>
            {!isLoggedInForm && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="First Name..."
                />
              </fieldset>
            )}
            {!isLoggedInForm && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  value={lastName}
                  className="input"
                  placeholder="Last Name..."
                />
              </fieldset>
            )}
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
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              {isLoggedInForm
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-violet-600 hover:underline font-semibold transition"
                onClick={() => setIsLoggedInForm(!isLoggedInForm)}
              >
                {isLoggedInForm ? "Register here" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary">
              {isLoggedInForm ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
