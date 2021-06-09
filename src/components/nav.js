import React from "react";
import { Row, Col, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function Nav(props) {
  return (
    <Row style={{ backgroundColor: "#ffffff", minHeight: "10vh" }}>
      <Col span={2} />
      <Col span={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "25px", fontWeight: "700" }}>
            <Link to="/">Fyntune</Link>
          </h1>
          <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "500" }}>
            Store
          </h3>
        </div>
      </Col>
      <Col span={6} />
      <Col span={8}>
        <Row style={{ height: "100%" }}>
          <Col xs={0} sm={0} md={12} lg={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <h1
                style={{
                  marginBlock: 0,
                  marginRight: "12%",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                Hi, {props.user.name}
              </h1>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Badge
                count={`₹ ${props.value}`}
                overflowCount={100000}
                offset={[25, 5]}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: "30px" }}
                  onClick={props.onCartClick}
                />
              </Badge>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={2} />
    </Row>
  );
}
