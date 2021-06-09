import React, { useState } from "react";
import { Row, Col, Input, Button, notification } from "antd";
import { Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toProducts, settoProducts] = useState(false);

  const loginClicked = () => {
    var regEmail =
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "") {
      notification.warning({
        message: "Enter a valid name",
      });
      return;
    }
    if (email === "" || !regEmail.test(email)) {
      notification.warning({
        message: "Enter a valid email",
      });
      return;
    }
    if (phone === "" || phone.length !== 10) {
      notification.warning({
        message: "Enter a valid phone",
      });
      return;
    }
    if (password === "") {
      notification.warning({
        message: "Enter a valid password",
      });
      return;
    }
    const user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      cart: [],
    };
    dispatch({ type: "SET_CURRENT_USER", payload: { user: user } });
    settoProducts(true);
  };

  if (toProducts) {
    return <Redirect to="/products" />;
  }

  return (
    <Row style={{ height: "100vh" }}>
      <Col xs={0} sm={0} md={12} lg={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "2%",
            backgroundColor: "#783F8E",
          }}
        >
          <h1
            style={{
              color: "#ffffff",
              fontSize: "50px",
              fontWeight: "900",
            }}
          >
            Fyntune Cart
          </h1>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            padding: "4%",
          }}
        >
          <h1 style={{ fontWeight: "700", marginBottom: "4%" }}>
            Login to continue
          </h1>
          <Input
            size="large"
            style={{
              marginBottom: "2%",
              borderRadius: "5px",
              height: "50px",
            }}
            placeholder="Enter name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Input
            size="large"
            style={{
              marginBottom: "2%",
              borderRadius: "5px",
              height: "50px",
            }}
            placeholder="Enter email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            size="large"
            style={{
              marginBottom: "2%",
              borderRadius: "5px",
              height: "50px",
            }}
            placeholder="Enter phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <Input.Password
            size="large"
            style={{
              marginBottom: "2%",
              borderRadius: "5px",
              height: "50px",
            }}
            placeholder="Enter password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            type="primary"
            size="large"
            onClick={loginClicked}
            style={{
              borderRadius: "10px",
              width: "120px",
              height: "50px",
              marginTop: "4%",
            }}
          >
            Login
          </Button>
        </div>
      </Col>
    </Row>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

// export default connect(null, mapDispatchToProps)(Login)
