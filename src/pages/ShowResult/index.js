import { useNavigate, useParams } from "react-router-dom";
import { getUserAnswer } from "../../service/getUserAnswer";
import { useEffect, useState } from "react";
import { getQuestion } from "../../service/getQuestions";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { topicAction } from "../../action/topic";

function ShowResult() {
  const [dataResult, setDataResult] = useState([]);
  const [topic, setTopic] = useState("");
  const { id } = useParams(); // Gọi useParams() để lấy tham số từ URL
  const [numberTrue, setTrue] = useState(0);
  const [numberWrong, setFalse] = useState(0);
  const [total, setTotal] = useState(0);
  const [dataQuestion, setDataQuestions] = useState([]);
  const [dataDraw, setDataDraw] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getUserAnswer().then((data) => {
      setDataResult(data);
    });
  }, [id]); // Thêm id làm phụ thuộc

  const result = dataResult.find((item) => item.id == id);

  useEffect(() => {
    if (result) {
      switch (result.topicId) {
        case 1:
          setTopic("HTML5");
          break;
        case 2:
          setTopic("CSS3");
          break;
        case 3:
          setTopic("Javascript");
          break;
        case 4:
          setTopic("ReactJS");
          break;
        default:
          setTopic("Unknown");
          break;
      }
    }
  }, [result]); // Thay đổi từ dataResult, id sang result

  useEffect(() => {
    if (result && result.answers) {
      let correct = 0;
      result.answers.forEach((item) => {
        if (item.answer === item.correctAnswer) {
          correct++;
        }
      });

      let wrong = result.answers.length - correct;
      setTrue(correct);
      setFalse(wrong);

      let percent = Math.round((correct / result.answers.length) * 100);
      setTotal(percent);
    }
  }, [result]); // Giữ nguyên result là phụ thuộc

  useEffect(() => {
    getQuestion().then((data) => {
      setDataQuestions(data);
    });
  }, [id]); // Thêm id làm phụ thuộc

  useEffect(() => {
    if (result && result.answers) {
      const questionsInResult = result.answers.map((answer) => {
        const correspondingQuestion = dataQuestion.find(
          (question) => question.id === answer.questionId
        );
        return {
          question: correspondingQuestion ? correspondingQuestion.question : "",
          answers: correspondingQuestion ? correspondingQuestion.answers : [],
          correctAnswer: correspondingQuestion
            ? correspondingQuestion.correctAnswer
            : "",
          ...answer,
        };
      });
      const updatedResult = {
        ...result,
        answers: questionsInResult,
      };
      setDataDraw(updatedResult.answers);
      console.log(dataDraw);
    }
  }, [result, dataQuestion]); // Giữ nguyên result và dataQuestion là phụ thuộc

  const handleDoAgain = async () => {
    // Dispatch hành động đặt lại chủ đề
    dispatch(topicAction(topic));

    // Chuyển hướng đến trang Excercise sau khi cập nhật thành công
    await navigate("/excercise");
  };

  return (
    <>
      <div className="page__result">
        <h1>Kết quả chủ đề: {topic}</h1>
        <div>
          <p className="page__header">
            Đúng: <span>{numberTrue}</span> | Sai: <span>{numberWrong}</span> |
            Tổng số câu:{" "}
            <span>{result && result.answers ? result.answers.length : 0}</span>{" "}
            | Tỷ lệ đúng: <span>{total}%</span>
          </p>

          <div className="table_results">
            {dataDraw.map((item, index) => (
              <div key={index}>
                <p>
                  Câu {index + 1}: {item.question}
                </p>
                <div className="choice">
                  {item.answers.map((itemChoice, indexChoice) => {
                    // Determine the class name for each answer
                    let className = "";
                    if (
                      indexChoice === item.answer &&
                      indexChoice === item.correctAnswer
                    ) {
                      className = "green-color"; // Answered and correct
                    } else if (
                      indexChoice === item.answer &&
                      indexChoice !== item.correctAnswer
                    ) {
                      className = "red-color"; // Answered and incorrect
                    } else if (indexChoice === item.correctAnswer) {
                      className = "green-color"; // Correct answer, but not chosen by the user
                    }

                    return (
                      <label key={indexChoice} className={className}>
                        <input
                          type="radio"
                          name={`question-${item.questionId}`}
                          value={itemChoice}
                          checked={indexChoice === item.answer}
                          disabled
                        />
                        {itemChoice}
                        <br />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            handleDoAgain();
          }}
        >
          Làm lại
        </button>
      </div>
    </>
  );
}

export default ShowResult;
