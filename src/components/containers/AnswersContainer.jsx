import React, { useState } from "react";
import { Header, StyledList } from "../StyledComponents";

const AnswersContainer = ({ initialState }) => {
  const [answers, setAnswers] = useState(initialState);
  return (
    <>
    <Header>
      {answers && answers.length > 0 ? answers.length : "No"} Answers
    </Header>
    </>
  );
};

export default AnswersContainer;
