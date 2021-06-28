import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import FlipMove from "react-flip-move";
import { Link } from "react-router-dom";
function Checkout() {
  const [{ cart, user }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <figure className="checkout__ad">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/Events/2021/summerreading/SR21_Phase1_ILM_650x45._CB668623484_.jpg"
            alt=""
          />
        </figure>
        <div className="checkout__items">
          <div className="checkout__title checkout__item-row">
            <h2>{user ? user?.displayName : "Guest"}'s Shopping Cart</h2>
          </div>

          {cart.length === 0 ? (
            <div className="empty__cart">
              Don't keep the cart empty, it's a sin!
            </div>
          ) : (
            <FlipMove staggerDurationBy={0} easing={"ease-in"} duration={200}>
              {cart?.map((product) => (
                <CheckoutProduct
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                />
              ))}
            </FlipMove>
          )}
        </div>
      </div>
      <div className="checkout__right">
        <div className="checkout__sutotal">
          <Subtotal />
        </div>
        {cart?.length !== 0 ? (
          <Link to="/payment">
            <div className="checkout__final">
              <button>Proceed to checkout</button>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Checkout;
