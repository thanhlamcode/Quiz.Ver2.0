import { useNavigate, useParams } from "react-router-dom";
import { getUserAnswer } from "../../service/getUserAnswer";
import { useEffect, useState } from "react";
import { getQuestion } from "../../service/getQuestions";
import { useDispatch } from "react-redux";
import { topicAction } from "../../action/topic";
import { Typography, Button, Card, Row, Col } from "antd";
import "./styles.scss";

const { Title, Text } = Typography;

function ShowResult() {
  const [dataResult, setDataResult] = useState([]);
  const [topic, setTopic] = useState("");
  const { id } = useParams();
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
  }, [id]);

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
  }, [result]);

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
  }, [result]);

  useEffect(() => {
    getQuestion().then((data) => {
      setDataQuestions(data);
    });
  }, [id]);

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
      setDataDraw(questionsInResult);
    }
  }, [result, dataQuestion]);

  const handleDoAgain = async () => {
    dispatch(topicAction(topic));
    await navigate("/excercise");
  };

  return (
    <div className="page__result">
      <Title level={2}>Kết quả chủ đề: {topic}</Title>
      <Text className="page__header">
        Đúng: <span>{numberTrue}</span> | Sai: <span>{numberWrong}</span> | Tổng
        số câu:{" "}
        <span>{result && result.answers ? result.answers.length : 0}</span> | Tỷ
        lệ đúng: <span>{total}%</span>
      </Text>

      <div className="table_results">
        <Row gutter={[16, 16]}>
          {dataDraw.map((item, index) => (
            <Col key={index} span={24}>
              <Card
                title={`Câu ${index + 1}: ${item.question}`}
                bordered={false}
              >
                <div className="choice">
                  {item.answers.map((itemChoice, indexChoice) => {
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
                      <>
                        <label key={indexChoice} className={className}>
                          <input
                            type="radio"
                            name={`question-${item.questionId}`}
                            value={itemChoice}
                            checked={indexChoice === item.answer}
                            disabled
                          />
                          {itemChoice}
                        </label>
                        <br />
                      </>
                    );
                  })}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Button
        type="primary"
        onClick={handleDoAgain}
        style={{ marginTop: "20px" }}
      >
        Làm lại
      </Button>
    </div>
  );
}

export default ShowResult;
