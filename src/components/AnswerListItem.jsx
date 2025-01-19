import { useContext, useState, useCallback, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import VotingButton from "./VotingButton";
import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { voteToAnswer } from "../api/answer";

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
  column-gap: 20px;
  color: white;
  margin-bottom: 2rem;
`;

const countVotes = (votes) => {
  if (votes) {
    return votes.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.state;
    }, 0);
  }
  return 0;
};

const getMyVoteState = (votes, userId) => {
  console.log("votes");
  console.log(votes);
  const vote = votes.filter((vote) => vote.voter.id === userId);
  if (vote.length === 0) {
    return 0;
  } else {
    return vote[0]["state"];
  }
};

const AnswerListItem = ({ answer, setPost, index }) => {
  const { user } = useContext(UserContext);
  const [myVotingState, setMyVotingState] = useState(0);

  const handleClickUpVote = useCallback(async () => {
    voteToAnswer(answer.id, 1).then(({ data }) =>
      setPost((prev) => ({
        ...prev,
        answers: prev.answers.map((answer, i) =>
          i !== index ? answer : { ...answer, votes: data }
        ),
      }))
    );
  }, [answer, setPost, index]);

  useEffect(() => {
      setMyVotingState(getMyVoteState(answer.votes, user.id));
    }
  , [user, answer]);

  const handleClickDownVote = useCallback(async () => {
    voteToAnswer(answer.id, -1).then(({ data }) =>
      setPost((prev) => ({
        ...prev,
        answers: prev.answers.map((answer, i) =>
          i !== index ? answer : { ...answer, votes: data }
        ),
      }))
    );
  }, [answer, setPost, index]);

  // #TODO Answer의 reply를 여기에 업데이트 하면 될거 같은데 어차피 answer의 reply니

  useEffect(() => {}, [answer]);

  return (
    <StyledLi>
      <VotingButton
        votes={countVotes(answer.votes)}
        handleClickUpVote={handleClickUpVote}
        handleClickDownVote={handleClickDownVote}
        state={myVotingState}
      ></VotingButton>
      <AnswerBodyArea>
        <Markdown remarkPlugins={[remarkGfm]}>{answer.body}</Markdown>
      </AnswerBodyArea>
    </StyledLi>
  );
};

export default AnswerListItem;
