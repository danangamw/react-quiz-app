import { useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data.js";
import { useRef } from "react";
import { indexToLetter } from "../utils/index.js";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [questions, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAnswer = (e, answer) => {
    if (!lock) {
      if (questions.ans === answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[questions.ans - 1].current.classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (lock) {
      if (index + 1 === data.length) {
        setResult(true);
        return;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>

          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {questions.question}
          </h2>

          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              A. {questions.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              B. {questions.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              C. {questions.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              D. {questions.option4}
            </li>
          </ul>

          <button onClick={nextQuestion}>Next</button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
