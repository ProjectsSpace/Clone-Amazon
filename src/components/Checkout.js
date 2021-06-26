import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "../StateProvider";

function Checkout() {
  const [{ cart }] = useStateValue();

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
            <h2>Shopping Cart</h2>
          </div>

          {cart?.map((product) => (
            <div key={uuidv4()} className="checkout__item-row">
              <figure className="item__image">
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="item__title">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <div className="product__rating">
                  {Array(product.rating)
                    .fill(0)
                    .map((_, el) => (
                      <span key={uuidv4()}>⭐</span>
                    ))}{" "}
                  <strong>{product.rating}</strong>
                </div>
                <div className="remove__item-button">
                  <button>Remove item</button>
                </div>
              </div>
              <div className="item__price">
                <strong>{product.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <div className="checkout__sutotal">
          <Subtotal />
        </div>
        <div className="checkout__final">
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
