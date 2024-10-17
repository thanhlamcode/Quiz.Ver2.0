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
      // Lọc ra tất cả các câu trả lời cũ cho questionId hiện tại
      const filteredAnswers = prevAnswers.filter(
        (answer) => answer.questionId !== questionId
      );
      // Tìm đáp án chính xác cho câu hỏi này
      const correctAnswer = questionData.find(
        (item) => item.id === questionId
      ).correctAnswer;

      // Thêm câu trả lời mới vào mảng đã lọc, bao gồm cả đáp án chính xác
      return [
        ...filteredAnswers,
        {
          questionId: questionId,
          answer: answerIndex,
          correctAnswer: correctAnswer, // Thêm đáp án chính xác vào đối tượng câu trả lời
        },
      ];
    });
  };

  useEffect(() => {
    console.log(answers);
    // Dispatch hành động khi answers thay đổi
    dispatch(answerUser(answers));
  }, [answers, dispatch]);

  console.log(inforUser);

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
        console.log(questions);
      });
    }
    // dispatch infoTopic chỉ khi topicId thay đổi
    dispatch(infoTopic(topicId));
  }, [topic, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <>
      <div className="excercise">
        <h1>Chủ đề luyện tập {topic}</h1>
        <br />
        <form onSubmit={handleSubmit}>
          {questionData.map((item, index) => (
            <div key={index}>
              <p className="number_question">
                Câu {index + 1}: {item.question}
              </p>
              {item.answers.map((question, index_answers) => (
                <div key={index_answers}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${item.id}`}
                      value={`option${index_answers}`}
                      required
                      onChange={() => {
                        handleChange(item.id, index_answers);
                      }}
                    />
                    <span> {question}</span>
                  </label>
                  <br />
                </div>
              ))}
            </div>
          ))}
          <button>Nộp bài</button>
        </form>
      </div>
    </>
  );
}

export default Excercise;
