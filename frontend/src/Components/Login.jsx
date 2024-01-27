import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    return setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      return setErrorMessages({
        name: "Invalid",
        message: "Invalid email or password",
      });
    } else {
      setIsSubmitted(true);
      localStorage.setItem("accessToken", json.accessToken);
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>email </label>
          <input
            type="text"
            name="email"
            required
            onChange={handleChange}
            value={credentials.email}
          />
          {renderErrorMessage("Invalid")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={credentials.password}
          />
          {renderErrorMessage("Invalid")}
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-success mx-2">
            Submit
          </button>
          <Link to="/signup" type="button" className="btn btn-info">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="app">
        <div className="login-form">
          <div className="title">Login</div>
          {isSubmitted ? navigate("/") : renderForm}
        </div>
      </div>
    </div>
  );
}
