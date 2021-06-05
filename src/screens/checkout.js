import React from "react";
import { Row, Col, Input, Button, notification } from "antd";
import { Redirect } from "react-router-dom";
import { setCurrentUser } from "../redux/user/user.actions";
import { connect } from "react-redux";
import CheckoutCard from "../components/checkout_card";

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      street: "",
      country: "",
      state: "",
      zip: "",
      toSuccess: false,
    };
  }
  placeOrder = () => {
    if (this.state.street === "") {
      notification.warning({
        message: "Enter a valid Street",
      });
      return;
    }
    if (this.state.country === "") {
      notification.warning({
        message: "Enter a valid Country",
      });
      return;
    }
    if (this.state.city === "") {
      notification.warning({
        message: "Enter a valid City",
      });
      return;
    }
    if (this.state.zip === "") {
      notification.warning({
        message: "Enter a valid Zip",
      });
      return;
    }
    if (this.state.state === "") {
      notification.warning({
        message: "Enter a valid State",
      });
      return;
    }
    var address = {
      city: this.state.city,
      street: this.state.street,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
    };
    var user = this.props.currentUser;
    user.address = address;
    this.props.setCurrentUser(user);
    this.setState({
      toSuccess: true,
    });
  };
  render() {
    if (this.state.toSuccess) {
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
                    defaultValue={this.props.currentUser.name}
                    disabled
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Input
                    defaultValue={this.props.currentUser.email}
                    disabled
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Input
                    defaultValue={this.props.currentUser.phone}
                    disabled
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>

                <Col span={24} style={{ padding: "10px" }}>
                  <Input
                    onChange={(event) => {
                      this.setState({ street: event.target.value });
                    }}
                    placeholder="Street Address"
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Input
                    onChange={(event) => {
                      this.setState({ country: event.target.value });
                    }}
                    placeholder="Country"
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Input
                    onChange={(event) => {
                      this.setState({ city: event.target.value });
                    }}
                    placeholder="City"
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Input
                    onChange={(event) => {
                      this.setState({ zip: event.target.value });
                    }}
                    placeholder="Zip"
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Col>
                <Col span={12} style={{ padding: "10px" }}>
                  <Input
                    onChange={(event) => {
                      this.setState({ state: event.target.value });
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
                      onClick={this.placeOrder}
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

                {this.props.currentUser.cart.map((product) => {
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
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
