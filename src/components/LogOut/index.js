import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import { login } from "../../action/login";
import Swal from "sweetalert2";

function LogOut() {
  const dispatch = useDispatch();
  const [focusIndex, setFocusIndex] = useState(null);
  const navigate = useNavigate();
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

  return (
    <>
      <div>
        <Link to="/">
          <button
            className={`button_nav ${focusIndex === 0 ? "focus" : ""}`}
            onClick={() => setFocusIndex(0)}
          >
            Home
          </button>
        </Link>
        <Link to="topic">
          <button
            className={`button_nav ${focusIndex === 1 ? "focus" : ""}`}
            onClick={() => setFocusIndex(1)}
          >
            Topic
          </button>
        </Link>
        <Link to="answer">
          <button
            className={`button_nav ${focusIndex === 2 ? "focus" : ""}`}
            onClick={() => setFocusIndex(2)}
          >
            Answer
          </button>
        </Link>
      </div>
      <button className="logout" onClick={handleClick}>
        LogOut
      </button>
    </>
  );
}

export default LogOut;
