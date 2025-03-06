import React from 'react'
import QuestionListItem from './QuestionListItem';
import PropTypes from "prop-types";

const QuestionList = ({questions}) => {
  return (
      <>
        {questions &&
          questions.length > 0 &&
          questions.map((question) => <QuestionListItem key={question.id} question={question} />)}
      </>
    );
}
QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
};


export default QuestionList