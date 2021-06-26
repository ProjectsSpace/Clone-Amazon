import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { useStateValue } from "../StateProvider";

function Header() {
  const [{ cart }] = useStateValue();

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
        <div className="header__option">
          <span className="header__optionLineOne">Hello, Sign in</span>
          <span className="header__optionLineTwo">Accounts &amp; Lists</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">&amp; Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
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
