import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "./Account.css";
import { Link } from "react-router-dom";

function Account() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  if (!user) {
    history.push("/");
  }

  return (
    <div className="account">
      <div className="account__titleArea">
        <h2>
          <small>Welcome to accounts</small> {user?.displayName}
        </h2>
      </div>
      <div className="account__body">
        <Link to="/userUpdate">
          <div className="account__item">
            <p className="title">Profile</p>
          </div>
        </Link>
        <div className="account__item">
          <p className="title">Address</p>
        </div>
        <div className="account__item">
          <p className="title">Orders</p>
        </div>
        <div className="account__item">
          <p className="title">Products</p>
        </div>
        <div className="account__item">
          <p className="title">Add Product</p>
        </div>
        <div className="account__item">
          <p className="title">System info</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
