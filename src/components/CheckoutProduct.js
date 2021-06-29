import React, { forwardRef } from "react";
import { useStateValue } from "../StateProvider";

const CheckoutProduct = forwardRef(
  ({ id, image, title, rating, price, itemRemoveButton }, ref) => {
    const [{ cart }, dispatch] = useStateValue();
    const removeFromCart = () => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: id,
      });
    };

    return (
      <div ref={ref} className="checkout__item-row">
        <figure className="item__image">
          <img src={image} alt={title} />
        </figure>
        <div className="item__title">
          <p>
            <strong>{title}</strong>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill(0)
              .map(() => (
                <span>⭐</span>
              ))}{" "}
            <strong>{rating}</strong>
          </div>
          {itemRemoveButton ? (
            ""
          ) : (
            <div className="remove__item-button">
              <button onClick={removeFromCart}>Remove item</button>
            </div>
          )}
        </div>
        <div className="item__price">
          <strong>${price}</strong>
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
