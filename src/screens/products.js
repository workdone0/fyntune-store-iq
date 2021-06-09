import React, { useState } from "react";
import { Row, Col, Card, notification } from "antd";

import Nav from "../components/nav";
import { products } from "../products";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";
const { Meta } = Card;

export default function Products() {
  const dispatch = useDispatch();
  const [productsArr, setProductsArr] = useState([]);
  const [value, setValue] = useState(0);
  const [redirectToCart, setredirectToCart] = useState(false);
  const User = useSelector((state) => state.user.currentUser);

  const onCartClick = () => {
    var user = User;
    user.cart = productsArr;
    dispatch({ type: "SET_CURRENT_USER", payload: { user: user } });
    setredirectToCart(true);
  };

  const addToCart = (product) => {
    var productsArray = productsArr;
    var Value = value;
    if (productsArray.find((productIn) => productIn.id === product.id)) {
      notification.info({
        message: "Already in Cart",
      });
    } else {
      product.quantity = 1;
      productsArray.push(product);
      Value = Value + product.price;
      notification.success({
        message: "Added to Cart",
      });
    }
    setProductsArr(productsArray);
    setValue(Value);
  };

  if (redirectToCart) {
    return <Redirect to="/cart" />;
  }
  return (
    <div>
      <Nav user={User} value={value} onCartClick={onCartClick} />
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
                        addToCart(product);
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
