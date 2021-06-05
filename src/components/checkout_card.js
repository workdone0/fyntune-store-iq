import React from "react";
import { Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
class CheckoutCard extends React.Component {
  render() {
    return (
      <Row style={{ height: "10vh" }}>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
              padding: "0 2%",
            }}
          >
            <p style={{ margin: 0, fontWeight: "700" }}>
              {this.props.item.name}
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <p style={{ margin: 0, fontWeight: "700" }}>
              <CloseOutlined /> {this.props.item.quantity}
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <p style={{ margin: 0 }}>{`₹${
              this.props.item.price * this.props.item.quantity
            }`}</p>
          </div>
        </Col>
      </Row>
    );
  }
}

export default CheckoutCard;
