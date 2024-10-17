import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { getQuestion } from "../../service/getQuestions";
import { useEffect, useState } from "react";
import { infoTopic } from "../../action/setTopic";
import { answerUser } from "../../action/infor";
import { post } from "../../until/request";
import Swal from "sweetalert2";
import { getUserAnswer } from "../../service/getUserAnswer";
import { useNavigate } from "react-router-dom";
import { Form, Radio, Button, Typography, Space } from "antd";

const { Title } = Typography;

function Excercise() {
  const topic = useSelector((state) => state.topicReducer);
  const [questionData, setQuestionData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const inforUser = useSelector((state) => state.inforUserReducer);
  const dispatch = useDispatch();
  const [length, setLength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (questionId, answerIndex) => {
    setAnswers((prevAnswers) => {
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questionId
      );
      const correctAnswer = questionData.find(
        (item) => item.id === questionId
      ).correctAnswer;

      return [
        ...filteredAnswers,
        {
          questionId: questionId,
          answer: answerIndex,
          correctAnswer: correctAnswer,
        },
      ];
    });
  };

  useEffect(() => {
    dispatch(answerUser(answers));
  }, [answers, dispatch]);

  useEffect(() => {
    let topicId;
    switch (topic) {
      case "HTML5":
        topicId = 1;
        break;
      case "CSS3":
        topicId = 2;
        break;
      case "Javascript":
        topicId = 3;
        break;
      case "ReactJS":
        topicId = 4;
        break;
      default:
        topicId = null;
    }
    if (topicId !== null) {
      getQuestion().then((data) => {
        const questions = data.filter((item) => item.topicId === topicId);
        setQuestionData(questions);
      });
    }
    dispatch(infoTopic(topicId));
  }, [topic, dispatch]);

  const handleSubmit = async () => {
    // Kiểm tra lại inforUser trước khi gửi
    if (inforUser && typeof inforUser === "object") {
      console.log(inforUser);
      await post("/userAnswers", inforUser);
      Swal.fire({
        title: "Good job!",
        text: "Nộp bài thành công!",
        icon: "success",
      });

      // Lấy dữ liệu mới sau khi nộp bài
      const newData = await getUserAnswer();
      // Cập nhật độ dài của dữ liệu
      setLength(newData.length);

      // Chuyển hướng đến trang kết quả với độ dài mới
      navigate(`/answer/${newData.length}`);
    } else {
      console.error("Invalid inforUser data:", inforUser);
    }
  };

  return (
    <div className="exercise-container">
      <Title level={2}>Chủ đề luyện tập: {topic}</Title>
      <Form onFinish={handleSubmit}>
        {questionData.map((item, index) => (
          <div key={index} className="question-block">
            <Title level={4} className="question-text">
              Câu {index + 1}: {item.question}
            </Title>
            <Radio.Group
              onChange={(e) => handleChange(item.id, e.target.value)}
              className="answer-group"
            >
              {item.answers.map((question, index_answers) => (
                <>
                  <Radio
                    key={index_answers}
                    value={index_answers}
                    className="answer-option"
                    style={{ fontSize: "15px" }}
                  >
                    {question}
                  </Radio>
                  <br />
                </>
              ))}
            </Radio.Group>
          </div>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block className="submit-btn">
            Nộp bài
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Excercise;
