import React, { useState } from "react";
import { Header, StyledList } from "../StyledComponents";
import AnswerListItem from "../presentations/AnswerListItem";
import PropTypes from "prop-types";
import { addAnswer } from "../../api/post";
import AnswerBox from "../presentations/AnswerBox";

const AnswersContainer = ({ initialState, questionId }) => {
  const [answers, setAnswers] = useState(initialState);
  const [answerBody, setAnswerBody] = useState("");
  
  const handleChangeOnAnswerBody = (e) => {
    setAnswerBody(e.target.value);
  };

  const handleClickPostAnswerButton = () => {
    addAnswer(questionId, answerBody).then(({ data }) => {
      setAnswers((prev)=> [...prev, data])
      setAnswerBody('')
    });
  };

  return (
    <>
      <Header>
        {answers && answers.length > 0 ? answers.length : "No"} Answers
      </Header>
      <StyledList>
        {answers &&
          answers.length > 0 &&
          answers.map((answer) => (
            <AnswerListItem key={answer.id} answer={answer} />
          ))}
      </StyledList>
      <AnswerBox answerBody={answerBody} handleChangeOnAnswerBody={handleChangeOnAnswerBody} handleClickPostAnswerButton={handleClickPostAnswerButton}/>
    </>
  );
};

AnswersContainer.propTypes = {
  initialState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      deletedAt: PropTypes.string,
      votes: PropTypes.array.isRequired,
    })
  ),
  questionId: PropTypes.string.isRequired,
};

export default AnswersContainer;
