import { useState } from "react";
import { getInfo } from "../../service/getInfo";
import "./style.scss";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
import { inforUserName } from "../../action/infor";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const handleLogin = (e) => {
    e.preventDefault();
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
    <>
      <form onSubmit={handleLogin} className="form_dn">
        <h1>LOGIN QUIZ</h1>
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
        <button className="login">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
