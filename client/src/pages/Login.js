import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:8000/api/login`, {
        email,
        password,
      });
      const language = data.language;
      console.log(data);
      window.localStorage.setItem("language", JSON.stringify(data.language));
      window.localStorage.setItem("username", JSON.stringify(data.username));
      window.localStorage.setItem("login", "true");
      toast.success("Login Successful");
      navigate(`/${language}`);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data);
    }
  };

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center vh-100">
        <div className=" col-md-3">
          <form onSubmit={handleSubmit} className="border p-4 text-white">
            <h1 className="text-center py-4">Sign In</h1>
            <div className="form-outline mb-4">
              <label className="form-label " htmlFor="input1">
                Email address
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="sign-btn form-outline mb-4 w-100">
              Sign In
            </button>
            <div className="text-center align-items-center">
              <p className="d-flex align-items-center justify-content-center">
                Not yet registered?
                <Link to="/register" className="ms-2">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
