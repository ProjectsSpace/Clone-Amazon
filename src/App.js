import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";
import Orders from "./components/Orders";
import Account from "./components/Account";
import UserProfile from "./components/user/UserProfile";
// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // Setting up user state listner
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/userUpdate">
            <Header />
            <UserProfile />
            <Footer />
          </Route>
          <Route path="/account">
            <Header />
            <Account />
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
