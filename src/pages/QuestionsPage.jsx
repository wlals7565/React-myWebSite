import styled from "styled-components";
import BlueButtonLink from "../components/BlueButtonLink";
import QuestionsContainer from "../components/containers/QuestionsContainer";
import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/post";

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
  const [questions, setQuestions] = useState(undefined);
    // 페이지네이션 용 포스트 총 갯수
    const [totalCount, setTotalCount] = useState([]);
    // 쿼리 스트링
    const [params, setParams] = useState({
      limit: 15,
      skip: 0,
    });
    
  useEffect(() => {
    getAllQuestions(params).then(({ data }) => {
      setQuestions(data.posts);
      setTotalCount(data.totalCount);
    });
  }, [params]);

  return (
    <main>
      <HeaderRow>
        <StyledHeader>Top Questions</StyledHeader>
        <BlueButtonLink to={`/ask`}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      {questions ? <QuestionsContainer initialState={questions} /> : "Loading"}
      <div>{totalCount}</div>
      <div>리팩토링 했다는 표시 그리고 테스트용겸</div>
    </main>
  );
};

export default QuestionsPage;
