import { useEffect, useState } from "react";
import { getTopic } from "../../service/getTopic";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { topicAction } from "../../action/topic";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className="topic">
        <h1>Danh sách chủ đề ôn luyện</h1>
        <table>
          <thead>
            <td>ID</td>
            <td>Chủ đề ôn luyện</td>
            <td></td>
          </thead>
          <tbody>
            {topicData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to="/excercise">
                    <button
                      className="btn-do"
                      onClick={() => handleClick(item.name)}
                    >
                      Làm bài
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Topic;
