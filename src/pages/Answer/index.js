import { useEffect, useState } from "react";
import { getUserAnswer } from "../../service/getUserAnswer";
import "./style.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Answer() {
  const [userAnswersData, setData] = useState([]);
  const userId = useSelector((state) => state.inforUserReducer);
  console.log(userId.userId);
  const navigate = useNavigate();
  useEffect(() => {
    getUserAnswer().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  const handleClick = (id) => {
    navigate(`/answer/${id}`);
  };

  return (
    <>
      <div className="answer">
        <h1>Danh sách bài luyện tập</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Tên chủ đề</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {userAnswersData.map((item) => {
              let topic = "";
              switch (item.topicId) {
                case 1:
                  topic = "HTML";
                  break;
                case 2:
                  topic = "CSS";
                  break;
                case 3:
                  topic = "Javascript";
                  break;
                case 4:
                  topic = "React";
                  break;
                default:
                  break;
              }

              if (item.userId === userId.userId) {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{topic}</td>
                    <td>
                      <button
                        className="view_full"
                        onClick={() => {
                          handleClick(item.id);
                        }}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                );
              }
              return null; // Phải có return null nếu không có gì để render
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Answer;
