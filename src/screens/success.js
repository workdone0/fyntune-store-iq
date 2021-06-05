import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import success from "../assets/animation/success.json";
import { Redirect } from "react-router-dom";

class Success extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        redirect: true,
      });
    }, 5000);
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Player
          autoplay={true}
          loop={true}
          src={success}
          style={{ height: "300px", width: "300px" }}
        ></Player>
        <h1>Order Placed Successfully</h1>
      </div>
    );
  }
}

export default Success;
