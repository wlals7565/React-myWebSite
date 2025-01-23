import React, { useState } from "react";
import { Header, StyledList } from "../StyledComponents";
import AnswerListItem from "../presentations/AnswerListItem";
import PropTypes from "prop-types";

const AnswersContainer = ({ initialState }) => {
  const [answers, setAnswers] = useState(initialState);
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
};

export default AnswersContainer;
