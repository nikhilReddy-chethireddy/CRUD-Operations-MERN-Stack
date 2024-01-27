import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    return setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/api/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      return setErrorMessages({ name: "Invalid", message: json.message });
    } else {
      setIsSubmitted(true);
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
          <label>username </label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            value={credentials.username}
          />
        </div>
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
        </div>
        <div className="button-container">
          <button type="submit" className="btn btn-success mx-2">
            Submit
          </button>
          <Link to="/login" type="button" className="btn btn-info">
            Login
          </Link>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="app">
        <div className="login-form">
          <div className="title">Sign Up</div>
          {isSubmitted ? (
            <div>
              <div>User is successfully Signed Up</div>
              <div>
                <Link to="/login" type="button" className="btn btn-info mt-3">
                  Login
                </Link>
              </div>
            </div>
          ) : (
            renderForm
          )}
        </div>
      </div>
    </div>
  );
}
