import { useEffect, useState } from "react";
import { getTopic } from "../../service/getTopic";
import { useDispatch } from "react-redux";
import { topicAction } from "../../action/topic";
import { Link } from "react-router-dom";
import { Table, Button, Typography } from "antd";
import "./styles.scss";

const { Title } = Typography;

function Topic() {
  const [topicData, setTopicData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTopic().then((data) => {
      setTopicData(data);
    });
  }, []);

  const handleClick = (topicChoice) => {
    dispatch(topicAction(topicChoice));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Chủ đề ôn luyện",
      dataIndex: "name",
      key: "name",
      width: "70%",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Link to="/excercise">
          <Button type="primary" onClick={() => handleClick(record.name)}>
            Làm bài
          </Button>
        </Link>
      ),
    },
  ];

  const dataSource = topicData.map((item) => ({
    key: item.id,
    id: item.id,
    name: item.name,
  }));

  return (
    <div className="topic-container">
      <Title level={2}>Danh sách chủ đề ôn luyện</Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        className="topic-table"
      />
    </div>
  );
}

export default Topic;
