import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <div className="App">
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home showAlert={showAlert} />} // Pass showAlert as a prop to Home
                />
                <Route exact path="/about" element={<About />} />
                <Route
                  exact
                  path="/login"
                  element={<Login showAlert={showAlert} />} // Pass showAlert as a prop to Login
                />
                <Route
                  exact
                  path="/signup"
                  element={<SignUp showAlert={showAlert} />} // Pass showAlert as a prop to SignUp
                />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
