import styled from "styled-components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getQuestion } from "../api/post";
import {
  UserLink,
  WhoAndWhen,
  StyledList,
  Header,
} from "../components/StyledComponents";
import AnswerBox from "../components/AnswerBox";
import AnswerListItem from "../components/AnswerListItem";
import QuestionContainer from "../components/containers/QuestionContainer";
import TagsContainer from "../components/containers/TagsContainer";
import LoadingCircle from "../components/presentations/LoadingCircle";
import CommentsContainer from "../components/containers/CommentsContainer";

const Container = styled.div`
  padding: 30px 20px;
`;

const AnswerBoundrary = styled.hr`
  margin: 2rem 0rem;
  border-color: rgba(255, 255, 255, 0.1);
`;

const QuestionMetaData = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: 9fr 1fr;
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
          <QuestionMetaData>
            <TagsContainer initialState={question.tags} />
            <WhoAndWhen>
              asked x times ago{" "}
              <UserLink style={{ display: "block" }}>
                {question.author?.name}
              </UserLink>
            </WhoAndWhen>
          </QuestionMetaData>
          <CommentsContainer initialState={question.comments} questionId={question.id} />
          <AnswerBoundrary />
          {/* #TODO 여기서부터 리팩토링 하면 됨 */}
          <Header>
            {question.answers && question.answers.length > 0
              ? question.answers.length
              : "No"}{" "}
            Answers
          </Header>
          <StyledList>
            {question.answers &&
              question.answers.length > 0 &&
              question.answers.map((answer, index) => (
                <AnswerListItem
                  key={answer.id}
                  answer={answer}
                  setPost={setQuestion}
                  index={index}
                />
              ))}
          </StyledList>
          <AnswerBox setPost={setQuestion} postId={question.id} />
        </Container>
      ) : (
        <LoadingCircle />
      )}
    </>
  );
};

export default QuestionPage;
