import { useState } from "react";
import { getInfo } from "../../service/getInfo";
import "./style.scss";
import Swal from "sweetalert2";
import { post } from "../../until/request";

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
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <>
      <form onSubmit={handleSubmit} className="form_dk">
        <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
        <div className="form__input">
          <label for="username">Username:</label> <br></br>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="form__input">
          <label for="password">Password:</label> <br></br>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form__input">
          <label for="fullName">Full Name:</label> <br></br>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <button className="login">Đăng ký</button>
      </form>
    </>
  );
}

export default RegisterPage;
