import React from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import "./login.scss";

function Login() {
  return (
    <div className="login-container">
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/login">
          <Button type="primary" size="large">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button type="default" size="large">
            Register
          </Button>
        </Link>
      </Space>
    </div>
  );
}

export default Login;
