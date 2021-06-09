import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { Redirect } from "react-router-dom";

import CartCard from "../components/cart_card";

export default function Cart() {
  const dispatch = useDispatch();
  const varU = useSelector((state) => state.user.currentUser);
  const [user, setUser] = useState(varU);
  const [redirectToCheckout, setredirectToCheckout] = useState(false);

  const onCartUpdate = async (product, qty) => {
    var User = user;
    var NPro = User.cart.filter((item) => item.id !== product.id);
    var Upro = product;
    Upro.quantity = qty !== "" ? Number(qty) : 0;
    NPro.push(Upro);
    User.cart = NPro;
    dispatch({ type: "SET_CURRENT_USER", payload: { user: User } });
    console.log(User);
    setUser(User);
  };

  if (redirectToCheckout) {
    return <Redirect to="/checkout" />;
  }
  var total = 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "2%" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Your Bag</h1>
      </div>
      {user.cart.map((item) => {
        total = total + item.price * item.quantity;
        return (
          <CartCard key={item.id} item={item} onCartUpdate={onCartUpdate} />
        );
      })}
      <Row>
        <Col sm={15} xs={15} md={20} lg={20} />
        <Col sm={9} xs={9} md={4} lg={4}>
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              textAlign: "center",
              padding: "2% 8%",
            }}
          >
            <hr />
            <p style={{ fontWeight: "700" }}>Total: ₹{total} </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8%",
            }}
          >
            <Button
              onClick={() => setredirectToCheckout(true)}
              style={{ borderRadius: "5px", height: "50px" }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
