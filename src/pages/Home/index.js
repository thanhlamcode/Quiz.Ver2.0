import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Typography, Space } from "antd";
import "./style.scss";

const { Title, Paragraph } = Typography;

function Home() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginReducer);

  const handleTopic = () => {
    if (isLogin) {
      navigate("/topic");
    } else {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa tiến hành đăng nhập!",
        text: "Tiến hành đăng nhập trước khi chọn chủ đề",
      });
      setTimeout(() => {
        navigate("login");
      }, 1500);
    }
  };

  const handleExcer = () => {
    if (isLogin) {
      navigate("/answer");
    } else {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa tiến hành đăng nhập!",
        text: "Tiến hành đăng nhập trước khi xem danh sách bài đã làm",
      });
      setTimeout(() => {
        navigate("login");
      }, 1500);
    }
  };

  return (
    <div className="home-container">
      <Title level={2}>Chúc mừng bạn đã đăng nhập thành công!</Title>
      <Space direction="vertical" className="home__button" size="large">
        <Button type="primary" onClick={handleTopic} block>
          Danh sách chủ đề ôn luyện
        </Button>
        <Button type="default" onClick={handleExcer} block>
          Danh sách bài đã luyện tập
        </Button>
      </Space>
      <Paragraph>
        Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến
        cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc
        nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập trình
        Frontend. Đối với các lập trình viên Frontend, website trắc nghiệm
        online cung cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ
        năng của mình trong các công nghệ và công cụ lập trình như HTML, CSS,
        JavaScript, jQuery, Bootstrap, Angular, React, Vue,...
      </Paragraph>
    </div>
  );
}

export default Home;
