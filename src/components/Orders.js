import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import Order from "./Order";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

function Orders() {
  const history = useHistory();
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  // redirecting non users to login page
  if (!user) {
    history.push("/login");
  }

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <div className="orders__title">
        <h1>Your Orders</h1>
      </div>
      <div className="orders__single">
        {orders.length === 0 ? (
          <div className="loader-spin">
            <CircularProgress />
          </div>
        ) : (
          orders?.map((order) => <Order key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}

export default Orders;
