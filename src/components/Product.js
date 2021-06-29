import React from "react";
import { useStateValue } from "../StateProvider";
import "./Product.css";

function Product({ id, title, image, price, rating }) {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {<span>{"⭐".repeat(rating)}</span>}

          <strong>{rating}</strong>
        </div>
      </div>
      <div className="product__image">
        <img src={image} alt="" />
      </div>
      <div className="product__button">
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
