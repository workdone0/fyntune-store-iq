import React, { useState } from "react";
import { Row, Col, Input, Button, notification } from "antd";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CheckoutCard from "../components/checkout_card";

export default function Checkout() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [toSuccess, setToSuccess] = useState(false);
  const User = useSelector((state) => state.user.currentUser);

  const placeOrder = () => {
    if (street === "") {
      notification.warning({
        message: "Enter a valid Street",
      });
      return;
    }
    if (country === "") {
      notification.warning({
        message: "Enter a valid Country",
      });
      return;
    }
    if (city === "") {
      notification.warning({
        message: "Enter a valid City",
      });
      return;
    }
    if (zip === "") {
      notification.warning({
        message: "Enter a valid Zip",
      });
      return;
    }
    if (state === "") {
      notification.warning({
        message: "Enter a valid State",
      });
      return;
    }
    var address = {
      city: city,
      street: street,
      state: state,
      zip: zip,
      country: country,
    };
    var user = User;
    user.address = address;
    dispatch({ type: "SET_CURRENT_USER", payload: { user: user } });
    setToSuccess(true);
  };
  if (toSuccess) {
    return <Redirect to="/success" />;
  }
  var total = 0;
  return (
    <div>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={24} md={16} lg={16} style={{ padding: "10px" }}>
          <div style={{ display: "flex", padding: "10px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "900" }}>
              Shipping Details
            </h1>
          </div>
          <div style={{ display: "flex", padding: "10px", width: "100%" }}>
            <Row style={{ width: "100%" }}>
              <Col span={24} style={{ padding: "10px" }}>
                <Input
                  defaultValue={User.name}
                  disabled
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={12} style={{ padding: "10px" }}>
                <Input
                  defaultValue={User.email}
                  disabled
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={12} style={{ padding: "10px" }}>
                <Input
                  defaultValue={User.phone}
                  disabled
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>

              <Col span={24} style={{ padding: "10px" }}>
                <Input
                  onChange={(event) => {
                    setStreet(event.target.value);
                  }}
                  placeholder="Street Address"
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={12} style={{ padding: "10px" }}>
                <Input
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                  placeholder="Country"
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={12} style={{ padding: "10px" }}>
                <Input
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                  placeholder="City"
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={12} style={{ padding: "10px" }}>
                <Input
                  onChange={(event) => {
                    setZip(event.target.value);
                  }}
                  placeholder="Zip"
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={12} style={{ padding: "10px" }}>
                <Input
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                  placeholder="State"
                  style={{ borderRadius: "10px", height: "40px" }}
                />
              </Col>
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "4%",
                  }}
                >
                  <Button
                    onClick={placeOrder}
                    style={{
                      borderRadius: "5px",
                      height: "50px",
                      width: "150px",
                    }}
                    type="primary"
                  >
                    Place Order
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={8} lg={8} style={{ padding: "10px" }}>
          <div
            style={{
              borderLeft: "2px solid",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px",
                flexDirection: "column",
              }}
            >
              <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Summary</h1>

              {User.cart.map((product) => {
                total = total + product.price * product.quantity;
                return <CheckoutCard item={product} />;
              })}
            </div>
            <Row>
              <Col span={18} />
              <Col span={6}>
                <div
                  style={{
                    width: "100%",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: "2% 8%",
                  }}
                >
                  <hr />
                  <p style={{ fontWeight: "700" }}> ₹{total} </p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
