// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="welcome">
        <h1>Welcome!!!</h1>
      </div>
      <div className="signup">
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
      <div className="login">
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <button>Log in</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
