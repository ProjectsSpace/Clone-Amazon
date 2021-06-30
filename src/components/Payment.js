import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import FlipMove from "react-flip-move";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import Subtotal from "./Subtotal";
import "./Payment.css";
import axios from "../axios";
import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { cartPriceTotal } from "../reducer";
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

function Payment() {
  const history = useHistory();
  const [{ cart, user }, dispatch] = useStateValue();

  // Redirecting to homepage if all products are removed
  if (cart?.length === 0 || !user) {
    history.push("/");
  }

  // Some stripe initialization
  const stripe = useStripe();
  const elements = useElements();

  // Button states
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Receive the token object from stripe
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe takes amount in subunits
        url: `/payments/create?total=${cartPriceTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  console.log("The secret is >>>>", clientSecret);

  const handleSubmit = async (e) => {
    // handles payment submit
    e.preventDefault();

    // sets to true when the button is clicked
    setProcessing(true);

    const response = await axios({
      method: "post",
      // Stripe takes amount in subunits
      url: `/payments/create?total=${cartPriceTotal(cart) * 100}`,
    });
    setClientSecret(response.data.clientSecret);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // Pushing order to database
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        // paymentIntent === payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_CART",
        });

        // using replace because we don't want the request comes back to payment page
        // push will create multiple redirects
        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h2>Delivery Address</h2>
          </div>
          <div className="delivery__address">
            <p>
              <strong>Name:</strong> {user?.displayName}{" "}
            </p>
            <p>
              <strong>Street:</strong> 123 React lane
            </p>
            <p>
              <strong>City:</strong> Facebook Inc. MV
            </p>
            <p>
              <strong>Country:</strong> USA
            </p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h2>Review items and delivery</h2>
          </div>
          <div className="payment__itemsBox">
            <div className="payment__items">
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
            </div>
            <div className="payment__sutotal">
              <Subtotal />
            </div>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h2>Payment Method</h2>
          </div>
          <div className="payment__body">
            <form action="" onClick={!disabled ? handleSubmit : undefined}>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        <i>
                          Pay : <strong>{value}</strong> via Stripe
                        </i>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={cartPriceTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </div>
              <CardElement
                className="payment__cardElement"
                onChange={handleChange}
              />
              <div className="payment__button">
                {clientSecret ? (
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                ) : (
                  <CircularProgress />
                )}
              </div>
              <div className="payment__error">{error ? error : ""}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
