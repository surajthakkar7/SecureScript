import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);

        // If the server responds with success, store the token in local storage
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Server Error", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
      props.showAlert("Error Creating Account", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2">
      <h1 className="my-2">Create an account to use iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={credentials.name} // Add this line
            onChange={onChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            placeholder="Enter email"
            name="email"
            value={credentials.email} // Add this line
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            required
            value={credentials.password} // Add this line
            minLength={8}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            onChange={onChange}
            name="cpassword"
            required
            minLength={8}
          />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
