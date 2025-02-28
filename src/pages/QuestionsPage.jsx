import styled from "styled-components";
import BlueButtonLink from "../components/BlueButtonLink";
import QuestionsContainer from "../components/containers/QuestionsContainer";
import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/post";
import LoadingCircle from "../components/presentations/LoadingCircle";
import { useSearchParams } from "react-router";

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
  const [totalCount, setTotalCount] = useState("");
  // 쿼리 스트링
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
  });

  useEffect(() => {
    getAllQuestions({...params, keyword}).then(({ data }) => {
      setQuestions(data.posts);
      setTotalCount(undefined);
    }).catch((error) => console.log(error))
  }, [params,keyword]);

  return (
    <main>
      <HeaderRow>
        <StyledHeader>Top Questions</StyledHeader>
        <BlueButtonLink to={`/ask`}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      {questions ? (
        <QuestionsContainer initialState={questions} />
      ) : (
        <LoadingCircle />
      )}
      <div>{totalCount}</div>
    </main>
  );
};

export default QuestionsPage;
