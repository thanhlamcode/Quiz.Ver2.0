import { useState } from "react";
import { getInfo } from "../../service/getInfo";
import { Form, Input, Button, Typography } from "antd";
import Swal from "sweetalert2";
import { post } from "../../until/request";
import "./style.scss";

const { Title } = Typography;

function RegisterPage() {
  const generateToken = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 20; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = () => {
    getInfo().then((data) => {
      const user = data.find((item) => item.username === username);
      if (user) {
        Swal.fire({
          icon: "error",
          title: "Tên tài khoản đã tồn tại",
          text: "Vui lòng thử một tên đăng nhập khác!",
        });
      } else {
        const info = {
          username: username,
          password: password,
          fullName: fullName,
          token: generateToken(),
        };
        post("/users", info);
        Swal.fire({
          title: "Good job!",
          text: "Đăng ký thành công!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="register-container">
      <Form
        name="register"
        layout="vertical"
        onFinish={handleSubmit}
        className="form_dk"
      >
        <Title level={2} style={{ textAlign: "center" }}>
          ĐĂNG KÝ TÀI KHOẢN
        </Title>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-btn"
            block
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
