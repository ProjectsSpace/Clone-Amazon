import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ cart, user }] = useStateValue();
  const username = user?.displayName;

  const handleAuthentication = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((err) => {
        console.log("Error Signing out");
      });
  };
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
        </Link>
      </div>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {user ? username : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {" "}
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={user ? "/orders" : "/login"}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">&amp; Orders</span>
          </div>
        </Link>
        <Link to="/account">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Account</span>
          </div>
        </Link>
        <div className="header_optionCart">
          <Link to="/checkout">
            <Badge
              className="badge"
              badgeContent={cart?.length || "0"}
              color="secondary"
            >
              <ShoppingCartIcon className="header__cart" />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
