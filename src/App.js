import React from "react";
import Login from "./screens/login";
import Products from "./screens/products";
import Cart from "./screens/cart";
import Checkout from "./screens/checkout";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./screens/success";

export default function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      {currentUser ? (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  );
}
