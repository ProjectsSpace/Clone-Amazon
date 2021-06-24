import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Product.css";

function Product({ title, image, price, rating }) {
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill(0)
            .map((_, el) => (
              <span key={uuidv4()}>⭐</span>
            ))}{" "}
          <strong>{rating}</strong>
        </div>
      </div>
      <div className="product__image">
        <img src={image} alt="" />
      </div>
      <div className="product__button">
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
