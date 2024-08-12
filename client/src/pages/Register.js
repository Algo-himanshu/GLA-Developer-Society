import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("java");
  const [identity, setIdentity] = useState("teacher");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, username, password, language, identity);
    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      email,
      username,
      password,
      language,
      identity,
    });
    toast.success("Registered Successfully");

    navigate("/login");
    console.log(data);
  };

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-3">
          <form className="border p-4 text-white" onSubmit={handleSubmit}>
            <h1 className="text-center py-4">Register</h1>
            <div className="form-outline mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Preferred Language</label>
              <select
                className="form-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
              </select>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">You Are?</label>
              <select
                className="form-select"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            <button type="submit" className="sign-btn form-outline mb-4 w-100">
              Sign In
            </button>
            <div className="text-center align-items-center">
              <p className="d-flex align-items-center justify-content-center">
                Already Registered?
                <Link to="/login" className="ms-2">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
