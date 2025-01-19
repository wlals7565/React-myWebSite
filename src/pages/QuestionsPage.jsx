import styled from "styled-components";
import QuestionRow from "../components/QuestionRow";
import BlueButtonLink from "../components/BlueButtonLink";
import { useState, useEffect } from "react";
import { getAllPost } from "../api/post";
import { useNavigate } from "react-router";
import QuestionsContainer from "../components/containers/QuestionsContainer";


const StyledHeader = styled.h1`
  font-size: 1.6rem;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 30px 20px;
  color: white;
`;

const QuestionsPage = () => {
  return (
    <main>
      <HeaderRow>
        <StyledHeader>Top Questions</StyledHeader>
        <BlueButtonLink to={`/ask`}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      <QuestionsContainer />
    </main>
  );
};

export default QuestionsPage;
