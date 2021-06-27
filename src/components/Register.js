import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import "./Register.css";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password doesn't match");
    } else {
      // Creating new user
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCreds) => {
          // Updating username
          userCreds.user.updateProfile({
            displayName: username,
          });
          // login in the newly registered user
          auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
              // Redirecting the user to the homepage
              if (auth) {
                history.push("/");
              }
            })
            .catch((err) => {
              console.log(err.code);
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
        });
    }
  };
  return (
    <div className="register">
      <Link to="/">
        <div className="register-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/263px-Amazon_logo.svg.png"
            alt=""
          />
        </div>
      </Link>
      <div className="register__container">
        <div className="register__title">
          <h1>Create account</h1>
        </div>
        <form action="">
          <div className="register__name sp-10">
            <p>
              <label htmlFor="username">Username</label>
            </p>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="register__email sp-10">
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
          <div className="register__password sp-10">
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
          <div className="register__password sp-10">
            <p>
              <label htmlFor="confirmPassword">Re-enter Password</label>
            </p>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="register__button sp-10">
            <button type="submit" onClick={handleRegistration}>
              Create your Amazon account
            </button>
          </div>
          <p className="sp-10">
            By creating an account, you agree to Amazon's Conditions of Use and
            Privacy Notice.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
