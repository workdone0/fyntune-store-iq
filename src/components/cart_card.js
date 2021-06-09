import React from "react";
import { Row, Col, Input } from "antd";

export default function CartCard(props) {
  const updateCart = (event) => {
    props.onCartUpdate(props.item, event.target.value);
  };
  return (
    <Row style={{ height: "20vh" }}>
      <Col sm={0} xs={0} md={6} lg={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            src={props.item.imgUrl}
            alt={props.item.name}
            style={{ height: "15vh", width: "auto", objectFit: "contain" }}
          />
        </div>
      </Col>
      <Col sm={11} xs={11} md={10} lg={10}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
            padding: "0 2%",
          }}
        >
          <p style={{ margin: 0, fontWeight: "700" }}>{props.item.name}</p>
        </div>
      </Col>
      <Col sm={4} xs={4} md={4} lg={4}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Input defaultValue={props.item.quantity} onChange={updateCart} />
        </div>
      </Col>
      <Col sm={9} xs={9} md={4} lg={4}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h1 style={{ margin: 0 }}>{`₹${
            props.item.price * props.item.quantity
          }`}</h1>
        </div>
      </Col>
    </Row>
  );
}
