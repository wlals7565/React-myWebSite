import React from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VotesForAnswerContainer from "../containers/VotesForAnswerContainer";
import PropTypes from "prop-types";
import ReplyContainer from "../containers/ReplyContainer";

const AnswerBodyArea = styled.div`
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;

  h1 {
    font-size: 2.5rem; /* 기본 크기 */
    font-weight: bold; /* 기본 두께 */
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h1 */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h2 */
  }

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h3 */
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h4 */
  }

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h5 */
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h6 */
  }

  p {
    font-size: 1rem; /* 기본 문단 크기 */
    color: #ccc;
    line-height: 1.5;
    margin-bottom: 10px;
    /* Log: Applied styles for p */
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 20px;
    color: #ccc;
    margin-bottom: 10px; /* 목록 하단 여백 */
    /* Log: Applied styles for ul, ol */
  }

  code {
    font-family: monospace; /* 코드에 적합한 폰트 */
    background-color: #333;
    color: #0f0;
    padding: 2px 4px;
    border-radius: 3px;
    /* Log: Applied styles for code */
  }

  blockquote {
    border-left: 3px solid #777;
    padding-left: 10px;
    color: #aaa;
    margin-bottom: 10px;
    font-style: italic;
    font-size: 1rem; /* 기본 크기 */
    /* Log: Applied styles for blockquote */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
    margin-bottom: 10px; /* 테이블 하단 여백 */
    /* Log: Applied styles for table */
  }

  th,
  td {
    border: 1px solid #777;
    padding: 5px 10px;
    font-size: 1rem; /* 기본 텍스트 크기 */
    /* Log: Applied styles for th, td */
  }

  th {
    background-color: #555;
    font-weight: bold; /* 테이블 헤더 강조 */
    /* Log: Applied styles for th */
  }
`;

const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 1fr 24fr;
  grid-template-rows: auto auto; /* 2행 고정 */
  column-gap: 20px;
  color: white;
  margin-bottom: 2rem;
  grid-auto-flow: row; /* 요소를 행별로 자동 배치 */
`;

const AnswerListItem = ({ answer }) => {
  return (
    <>
      <StyledLi>
        <VotesForAnswerContainer
          initialState={answer.votes}
          answerId={answer.id}
        />
        <AnswerBodyArea>
          <Markdown remarkPlugins={[remarkGfm]}>{answer.body}</Markdown>
        </AnswerBodyArea>
      </StyledLi>
      {/*여기서부터 해야 한다. 밑은 reply container로 넣자 넣는 김에 replyButton도?*/}
      <ReplyContainer initialState={answer.replies}/>
    </>
  );
};

AnswerListItem.propTypes = {
  answer: PropTypes.shape({
    votes: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    deletedAt: PropTypes.string,
    replies: PropTypes.array.isRequired
  }),
};

export default React.memo(AnswerListItem);
