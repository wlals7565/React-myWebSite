import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { getPost } from "../api/post";
import {
  Tag,
  UserLink,
  WhoAndWhen,
  StyledList,
  Header,
} from "../components/StyledComponents";
import VotingButton from "../components/VotingButton";
import UserContext from "../contexts/UserContext";
import CommentForm from "../components/CommentForm";
import CommentListItem from "../components/CommentListItem";
import AnswerBox from "../components/AnswerBox";
import AnswerListItem from "../components/AnswerListItem";
import { vote } from "../api/post";

const Container = styled.div`
  padding: 30px 20px;
`;

const AnswerBoundrary = styled.hr`
  margin: 2rem 0rem;
  border-color: rgba(255, 255, 255, 0.1);
`;

const QuestionBodyArea = styled.div`
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  margin-bottom: 20px;

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

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: white;
`;

const QuestionMetaData = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: 9fr 1fr;
`;

const Tags = styled.div``;

const QuestionBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 24fr;
  column-gap: 20px;
  color: white;
`;

const StyledHr = styled.hr`
  border-color: #555;
`;

const CommentsBox = styled.div`
  margin: 2rem 2rem;
`;

const AddCommentButton = styled.button`
  color: #3ca4ff;
  text-decoration: none;
  background-color: transparent; /* 배경색을 투명으로 설정 */
  border: none; /* 테두리를 없앰 */
  border-radius: 0; /* 모서리 둥글게 설정 (0으로 하면 직각 모서리) */
  outline: none; /* 포커스 시 나타나는 외곽선 없애기 */
  padding: 0; /* 버튼 내부 여백 제거 */
  margin-top: 2rem;
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

// 제목, 본문, 댓글, 댓글 다는 폼 형식
const QuestionPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    body: "",
    tags: [],
    votes: [],
    answers: [],
  });
  const [myVotingState, setMyVotingState] = useState(0);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const { user } = useContext(UserContext);

  const handleClickAddACommentButton = () => {
    setShowAddCommentForm(!showAddCommentForm);
  };

  const handleClickUpVote = useCallback(() => {
    vote(post.id, 1).then(({ data }) =>
      setPost((prev) => ({ ...prev, votes: data }))
    );
  }, [post]);

  const handleClickDownVote = useCallback(() => {
    vote(post.id, -1).then(({ data }) =>
      setPost((prev) => ({ ...prev, votes: data }))
    );
  }, [post]);

  // 사용자가 질문 처음 들어왔을 때
  // 게시글 설정
  // 투표 현황 설정
  useEffect(() => {
    getPost(id).then((result) => {
      setPost(result.data);
      console.log(1);
      setMyVotingState(getMyVoteState(result.data.votes, user.id));
    });
  }, [id, user]);

  // 사용자가 투표한 이후 투표 갱신용
  useEffect(() => {
    console.log(2);
    setMyVotingState(getMyVoteState(post.votes, user.id));
  }, [post, user.id]);

  return (
    <Container>
      <StyledHeader>{post.title}</StyledHeader>
      <StyledHr />
      <QuestionBody>
        <VotingButton
          handleClickUpVote={handleClickUpVote}
          handleClickDownVote={handleClickDownVote}
          votes={countVotes(post.votes)}
          state={myVotingState}
        />
        <QuestionBodyArea>
          <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
        </QuestionBodyArea>
      </QuestionBody>
      <QuestionMetaData>
        <Tags>
          {post.tags &&
            post.tags.length > 0 &&
            post.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
        </Tags>
        <WhoAndWhen>
          asked x times ago{" "}
          <UserLink style={{ display: "block" }}>{post.author?.name}</UserLink>
        </WhoAndWhen>
      </QuestionMetaData>
      <CommentsBox>
        <StyledList>
          {post.comments &&
            post.comments.length > 0 &&
            post.comments.map((comment, index) => (
              <CommentListItem
                key={comment.id}
                comment={comment}
                setPost={setPost}
                index={index}
              />
            ))}
        </StyledList>
        {!showAddCommentForm && (
          <AddCommentButton onClick={handleClickAddACommentButton}>
            Add a comment
          </AddCommentButton>
        )}
        {showAddCommentForm && (
          <CommentForm
            setPost={setPost}
            postId={id}
            setShowAddCommentForm={setShowAddCommentForm}
          />
        )}
      </CommentsBox>
      <AnswerBoundrary />
      <Header>
        {post.answers && post.answers.length > 0 ? post.answers.length : "No"}{" "}
        Answers
      </Header>
      <StyledList>
        {post.answers &&
          post.answers.length > 0 &&
          post.answers.map((answer, index) => (
            <AnswerListItem
              key={answer.id}
              answer={answer}
              setPost={setPost}
              index={index}
            />
          ))}
      </StyledList>
      <AnswerBox
        setPost={setPost}
        postId={post.id}
      />
    </Container>
  );
};

export default QuestionPage;
