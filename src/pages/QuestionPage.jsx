import styled from "styled-components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getQuestion } from "../api/post";
import AnswerBox from "../components/AnswerBox";
import QuestionContainer from "../components/containers/QuestionContainer";
import LoadingCircle from "../components/presentations/LoadingCircle";
import AnswersContainer from "../components/containers/AnswersContainer";

const Container = styled.div`
  padding: 30px 20px;
`;

const AnswerBoundrary = styled.hr`
  margin: 2rem 0rem;
  border-color: rgba(255, 255, 255, 0.1);
`;


// 제목, 본문, 댓글, 댓글 다는 폼 형식
const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(undefined);

  useEffect(() => {
    getQuestion(id)
      .then((result) => {
        setQuestion(result.data);
      })
      .catch(() => {});
  }, [id]);

  return (
    <>
      {question ? (
        <Container>
          <QuestionContainer initialState={question} />
          <AnswerBoundrary />
          <AnswersContainer initialState={question.answers}/>
          <AnswerBox setPost={setQuestion} postId={question.id} />
        </Container>
      ) : (
        <LoadingCircle />
      )}
    </>
  );
};

export default QuestionPage;
