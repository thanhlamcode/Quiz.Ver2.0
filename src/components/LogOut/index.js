import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Menu } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
import Swal from "sweetalert2";
import "./style.css";

function LogOut() {
  const dispatch = useDispatch();
  const [focusIndex, setFocusIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook để lấy thông tin đường dẫn hiện tại

  const handleClick = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất?",
      showCancelButton: true,
      confirmButtonText: "Đăng Xuất",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đăng xuất thành công!", "", "success");
        dispatch(login());
        navigate("/login");
      }
    });
  };

  // Tự động thay đổi focusIndex dựa trên đường dẫn hiện tại
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setFocusIndex(0);
        break;
      case "/topic":
        setFocusIndex(1);
        break;
      case "/answer":
        setFocusIndex(2);
        break;
      default:
        setFocusIndex(null);
    }
  }, [location.pathname]);

  return (
    <div className="logout-container">
      <Menu mode="horizontal" selectedKeys={[focusIndex?.toString()]}>
        <Menu.Item key="0">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/topic">Topic</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/answer">Answer</Link>
        </Menu.Item>
      </Menu>
      <Button
        type="primary"
        danger
        onClick={handleClick}
        style={{ marginTop: "10px" }}
      >
        LogOut
      </Button>
    </div>
  );
}

export default LogOut;
