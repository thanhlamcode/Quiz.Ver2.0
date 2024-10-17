import { useEffect, useState } from "react";
import { getUserAnswer } from "../../service/getUserAnswer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Typography } from "antd";
import "./style.scss";

const { Title } = Typography;

function Answer() {
  const [userAnswersData, setData] = useState([]);
  const userId = useSelector((state) => state.inforUserReducer);
  const navigate = useNavigate();

  useEffect(() => {
    getUserAnswer().then((data) => {
      setData(data);
    });
  }, []);

  const handleClick = (id) => {
    navigate(`/answer/${id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Tên chủ đề",
      dataIndex: "topic",
      key: "topic",
      width: "70%",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleClick(record.id)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const dataSource = userAnswersData
    .filter((item) => item.userId === userId.userId)
    .map((item) => ({
      key: item.id,
      id: item.id,
      topic: (() => {
        switch (item.topicId) {
          case 1:
            return "HTML";
          case 2:
            return "CSS";
          case 3:
            return "Javascript";
          case 4:
            return "React";
          default:
            return "Unknown";
        }
      })(),
    }));

  return (
    <div className="answer-container">
      <Title level={2}>Danh sách bài luyện tập</Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        className="answer-table"
      />
    </div>
  );
}

export default Answer;
