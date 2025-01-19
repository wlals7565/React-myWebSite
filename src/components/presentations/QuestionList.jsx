import React from "react";
import QuestionListItem from "./QuestionListItem";

const QuestionsList = ({ questions }) => {
  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((question) => <QuestionListItem question={question} />)}
    </>
  );
};

export default QuestionsList;
