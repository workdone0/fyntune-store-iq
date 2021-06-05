import React from "react";
import { Row, Col, Button } from "antd";
import { Redirect } from "react-router-dom";
import { setCurrentUser } from "../redux/user/user.actions";
import { connect } from "react-redux";
import CartCard from "../components/cart_card";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.currentUser,
      redirectToCheckout: false,
    };
  }
  onCartUpdate = (product, qty) => {
    var user = this.props.currentUser;
    var NPro = this.props.currentUser.cart.filter(
      (item) => item.id !== product.id
    );
    var Upro = product;
    Upro.quantity = qty !== "" ? Number(qty) : 0;
    NPro.push(Upro);
    user.cart = NPro;
    this.props.setCurrentUser(user);
    this.setState({
      user: user,
    });
    console.log(this.props);
  };
  render() {
    if (this.state.redirectToCheckout) {
      return <Redirect to="/checkout" />;
    }
    var total = 0;
    return (
      <div>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2%" }}
        >
          <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Your Bag</h1>
        </div>
        {this.state.user.cart.map((item) => {
          total = total + item.price * item.quantity;
          return (
            <CartCard
              key={item.id}
              item={item}
              onCartUpdate={this.onCartUpdate}
            />
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
                onClick={() => this.setState({ redirectToCheckout: true })}
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
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
