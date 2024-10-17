import { useState } from "react";
import { getInfo } from "../../service/getInfo";
import { Form, Input, Button, Typography } from "antd";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
import { inforUserName } from "../../action/infor";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const { Title } = Typography;

function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleLogin = () => {
    getInfo()
      .then((data) => {
        const user = data.find(
          (item) => item.username === username && item.password === password
        );
        if (user) {
          Swal.fire({
            title: "Good job!",
            text: "Đăng nhập thành công!",
            icon: "success",
          });
          dispatch(inforUserName(user.id));
          dispatch(login());
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Tên đăng nhập hoặc mật khẩu sai!!",
            text: "Vui lòng đăng nhập lại!",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching info:", error);
      });
  };

  return (
    <div className="login-container">
      <Form
        name="login"
        layout="vertical"
        onFinish={handleLogin}
        className="form_dn"
      >
        <Title level={2} style={{ textAlign: "center" }}>
          LOGIN QUIZ
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-btn" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
