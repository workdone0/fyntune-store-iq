import React from "react";
import { Row, Col, Card, notification } from "antd";

import Nav from "../components/nav";
import { products } from "../products";

import { setCurrentUser } from "../redux/user/user.actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const { Meta } = Card;

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      productsArr: [],
      value: 0,
      redirectToCart: false,
    };
  }
  onCartClick = () => {
    var user = this.props.currentUser;
    user.cart = this.state.productsArr;
    this.props.setCurrentUser(user);
    this.setState({
      redirectToCart: true,
    });
  };
  addToCart = (product) => {
    var productsArray = this.state.productsArr;
    var value = this.state.value;
    if (productsArray.find((productIn) => productIn.id === product.id)) {
      notification.info({
        message: "Already in Cart",
      });
    } else {
      product.quantity = 1;
      productsArray.push(product);
      value = value + product.price;
      notification.success({
        message: "Added to Cart",
      });
    }
    this.setState({
      productsArr: productsArray,
      value: value,
    });
  };
  render() {
    if (this.state.redirectToCart) {
      return <Redirect to="/cart" />;
    }
    return (
      <div>
        <Nav
          user={this.props.currentUser}
          value={this.state.value}
          onCartClick={this.onCartClick}
        />
        <Row>
          {products.map((product) => {
            return (
              <>
                <Col span={1} />
                <Col xs={22} sm={22} md={10} lg={4}>
                  <Card
                    style={{ width: "100%", margin: "20px 0" }}
                    cover={<img alt="example" src={product.imgUrl} />}
                    actions={[
                      <p
                        onClick={() => {
                          this.addToCart(product);
                        }}
                        style={{ fontSize: "20px", margin: 0 }}
                      >
                        Add to Cart
                      </p>,
                    ]}
                  >
                    <Meta
                      title={product.name}
                      description={`₹ ${product.price}`}
                    />
                  </Card>
                </Col>
                <Col span={1} />
              </>
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
