import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./UserProfile.css";

import { auth } from "../../firebase";

function UserProfile() {
  const history = useHistory();
  const [{ user }] = useStateValue();

  const [newUsername, setNewUsername] = useState(user?.displayName);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    document.title = "Update profile";
  });

  if (!user) {
    history.push("/");
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // Getting the current user
    const currentUser = auth.currentUser;

    // Changing the username if it's different than the current username
    if (currentUser.displayName !== newUsername) {
      currentUser
        .updateProfile({
          displayName: newUsername,
        })
        .then(() => {
          console.log("User Name updated");
        });
    }

    // Changing the password if it's different than the current password
    if (newPassword) {
      currentUser.updatePassword(newPassword).then(() => {
        console.log("User password updated");
      });
    }
  };
  return (
    <div className="user__profile">
      <form className="update__form" onSubmit={handleProfileUpdate}>
        <div className="form__element">
          <p>
            <label htmlFor="username">Username</label>
          </p>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="form__element">
          <p>
            <label htmlFor="password">New Password</label>
          </p>
          <input
            id="password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="update__button">Update</button>
      </form>
    </div>
  );
}

export default UserProfile;
