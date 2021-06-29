import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
function Order({ order }) {
  return (
    <div className="order">
      <div className="order__titleArea">
        <h3>Order - {order?.id}</h3>
        <p>
          Order placed at -{" "}
          {moment.unix(order?.data.created).format("MMM Do YYYY, h:mma")}
        </p>
        <div className="order__total">
          <CurrencyFormat
            renderText={(value) => (
              <p>
                Order Total : <strong>{value}</strong>{" "}
              </p>
            )}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
      </div>

      <div className="order__orderBody">
        {order?.data.cart.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            itemRemoveButton={true}
          />
        ))}
      </div>
      <div className="order__footer">
        <Link to="/">
          <button>Back to homepage</button>
        </Link>
      </div>
    </div>
  );
}

export default Order;
