import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <div className="login-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png"
            alt=""
          />
        </div>
      </Link>
      <div className="login__container">
        <div className="login__title">
          <h1>Sign In</h1>
        </div>
        <form action="">
          <div className="login__email sp-10">
            <p>
              <label htmlFor="mail">E-mail</label>
            </p>
            <input
              type="email"
              id="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__password sp-10">
            <p>
              <label htmlFor="password">Password</label>
            </p>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signIn__button sp-10">
            <button type="submit" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <p className="sp-10">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
        </form>
      </div>
      <Link to="/register">
        <div className="signUp__button">
          <button>Create your Amazon account</button>
        </div>
      </Link>
    </div>
  );
}

export default Login;
