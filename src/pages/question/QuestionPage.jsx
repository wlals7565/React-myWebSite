import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingCircle from "../../components_v2/presentaions/common/LoadingCircle";
import Comment from "../../components_v2/presentaions/question/Comment";
import {
  addComment,
  deletePost,
  voteToPost,
  getQuestion,
} from "../../api/post";
import UserContext from "../../contexts/user/UserContext";
import { deleteComment, updateComment } from "../../api/comment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { follow, unfollow } from "../../api/follows";
import LikeIcon from "../../components_v2/presentaions/icons/LikeIcon";
import ShareIcon from "../../components_v2/presentaions/icons/ShareIcon";

const QuestionBox = styled.div`
  flex: 1;
  padding: 5rem 2rem;
  background-color: #ffffff;
  position: relative;

  h1 {
    font-size: 2.5rem; /* 기본 크기 */
    font-weight: bold; /* 기본 두께 */
    margin-bottom: 10px;
    /* Log: Applied styles for h1 */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h2 */
  }

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h3 */
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h4 */
  }

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h5 */
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h6 */
  }

  p {
    font-size: 1rem; /* 기본 문단 크기 */
    line-height: 1.5;
    margin-bottom: 10px;
    /* Log: Applied styles for p */
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 20px;
    margin-bottom: 10px; /* 목록 하단 여백 */
    /* Log: Applied styles for ul, ol */
  }

  code {
    font-family: monospace; /* 코드에 적합한 폰트 */
    background-color: #ebf5ff;
    padding: 2px 4px;
    border-radius: 3px;
    /* Log: Applied styles for code */
  }

  blockquote {
    border-left: 3px solid #777;
    padding-left: 10px;
    margin-bottom: 10px;
    font-style: italic;
    font-size: 1rem; /* 기본 크기 */
    /* Log: Applied styles for blockquote */
  }

  table {
    width: 100%;
    border-collapse: collapse;
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

const QuestionHeaderBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitleBox = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const QuestionMetaDataBox = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

const StickBox = styled.div`
  position: sticky; /* absolute 대신 sticky 사용 */
  top: 5rem; /* 상단 여백 조정 */
  left: 0;
  transform: translateX(-10rem); /* 왼쪽으로 5vw만큼 이동 */
  width: 3rem;
  height: 9rem;
  background-color: #f0f0f0;
  border: transparent;
  border-radius: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const SideBarButton = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ $voteState }) => ($voteState ? "1px solid #A1F524" : "none")};
  outline: none;
  width: 3rem;
  height: 3rem;
  background-color: #ffffff;

  color: ${({ $voteState }) => ($voteState ? "#A1F524" : "#8e8e8e")};
  cursor: pointer;

  &:hover {
    color: #000000;
    border: 1px solid black;
  }
`;

const InformationBox = styled.div`
  font-size: 1.5rem;
  display: flex;
`;

const NameBox = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

// 새로운 스타일 컴포넌트 추가
const Dot = styled.div`
  margin: 0 0.5rem; /* 좌우 여백 추가 */
  /* 또는 padding: 0 0.5rem; */
`;

const CommentBox = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
`;
const CommentTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CommentInput = styled.textarea`
  margin: 1rem 0;
  min-height: 4.5rem; /* 3줄 기준 (1.5rem * 3) */
  resize: vertical; /* 수직으로만 크기 조절 가능 */
  padding: 0.5rem;
  line-height: 1.5;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const CommentButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const CommentSubmitButton = styled.button`
  border: none;
  background-color: #246beb;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #1d56bc;
  }

  &:active {
    background-color: #16408d;
  }
`;

const CommentListBox = styled.div`
  margin-top: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const TextButton = styled.button`
  border: none;
  cursor: pointer;
  margin-right: 2rem;
  color: #868e96;
  background-color: transparent;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    color: #000000;
  }
`;

// 파일 상단에 함수 추가
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};

const urlTransform = (url, key, node) => {
  return url; // URL을 그대로 반환
};

const VoteBox = styled.div`
  font-size: 1.2rem;
`;

const TagBox = styled.div`
  display: flex;
`;
const TagButton = styled.button`
  color: black;
  padding: 0.5rem;
  background-color: #f0f0f0;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  margin-right: 1rem;
  cursor: pointer;
  height: fit-content;
  font-size: 1.2rem;

  &:hover {
    background-color: #e4e4e4;
  }

  &:active {
    background-color: #d8d8d8;
  }
`;

const FollowButton = styled.button`
  border-radius: 20px;
  cursor: pointer;
  margin-right: 2rem;
  border: none;
  background-color: #246beb;
  padding: 0.5rem 1rem;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    background-color: #1d56bc;
  }

  &:active {
    background-color: #16408d;
  }
`;

const checkVoteState = (votes, username) => {
  return votes.some((vote) => vote.voter.name === username);
};

// 팔로우 했는지 안했는지 체크하기
const checkFollowing = (followers, userId) => {
  console.log("checkFollowing");
  console.log(followers);
  console.log(userId);
  const isFollowing = followers.some(({ follower }) => follower.id === userId);
  return !isFollowing;
};

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [commentInput, setCommentInput] = useState("");
  const { user } = useContext(UserContext);
  console.log(user);
  console.log(question);

  // 구독하기 버튼 클릭 시
  const handleClickFollowButton = async () => {
    await follow(question.author.id);
    setQuestion((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        followers: [...prev.author.followers, { follower: { id: user.id } }],
      },
    }));
  };

  // 구독 취소하기 버튼 클릭 시
  const handleClickUnfollowButton = async () => {
    await unfollow(question.author.id);
    setQuestion((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        followers: prev.author.followers.filter(
          ({ follower }) => follower.id !== user.id
        ),
      },
    }));
  };

  const navigate = useNavigate();
  useEffect(() => {
    getQuestion(id)
      .then((result) => {
        const { comments, ...questionData } = result.data; // 구조 분해 할당 사용
        setQuestion(questionData);
        setComments(comments);
      })
      .catch(() => {
        alert("삭제되었거나 존재하지 않는 게시물 입니다.");
        navigate(-1);
      });
  }, [id]);

  // 댓글 제출 시
  const handleClickSubmitComment = async () => {
    //
    try {
      const result = await addComment(id, commentInput);
      setComments((prev) => [...prev, result.data]);
      setCommentInput("");
    } catch (error) {
      alert("서버에서 오류가 발생하였습니다. 나중에 다시 시도해 주세요.");
    }
  };

  // 댓글 입력시
  const handleChangeComment = (e) => {
    setCommentInput(e.target.value);
  };

  // 게시글 삭제 요청
  // 삭제 요청시 이전 페이지로 돌아감
  const handleClickDeleteButton = async () => {
    try {
      const result = await deletePost(id);
      alert(result.data.message);
      navigate(-1);
    } catch (error) {
      alert("서버에서 오류가 발생하였습니다. 나중에 다시 시도해 주세요.");
    }
  };

  // 게시글 수정 요청
  const handleClickUpdateButton = async () => {
    navigate(`/WriteQuestion?id=${question.id}`);
  };

  // 댓글 수정
  const handleUpdateComment = async (commentId, newBody) => {
    try {
      await updateComment(commentId, newBody);

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, body: newBody } : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  // 해당 게시글에 투표
  const handleClickVoteButton = async () => {
    console.log(user);
    try {
      const { data } = await voteToPost(id, 1);
      if (!data)
        return setQuestion((prev) => ({
          ...prev,
          votes: prev.votes.filter((vote) => vote.voter.name !== user.username),
        }));
      setQuestion((prev) => ({ ...prev, votes: [...prev.votes, data] }));
    } catch (error) {
      alert("게시글 좋아요에 실패하였습니다.");
    }
  };

  const handleClickCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("URL이 복사되었습니다!");
      })
      .catch(() => {
        toast.error("복사에 실패했습니다.");
      });
  };

  // shift+enter 입력시
  const handlePressShiftAndEnterToCommnet = async (e) => {
    if (e.shiftKey && e.key === "Enter") {
      const result = await addComment(id, commentInput);
      setComments((prev) => [...prev, result.data]);
      setCommentInput("");
    }
  };

  return question ? (
    <QuestionBox>
      <ToastContainer position="top-center" autoClose={2000} />
      <QuestionHeaderBox>
        <QuestionTitleBox>{question.title}</QuestionTitleBox>
        <QuestionMetaDataBox>
          <InformationBox>
            <NameBox>{question.author.name}</NameBox>
            <Dot>·</Dot>
            <div>{formatDate(question.createdAt)}</div>
          </InformationBox>
          {user.username === question.author.name ? (
            <ButtonBox>
              <TextButton onClick={handleClickUpdateButton}>수정</TextButton>
              <TextButton onClick={handleClickDeleteButton}>삭제</TextButton>
            </ButtonBox>
          ) : (
            <>
              {" "}
              {checkFollowing(question.author.followers, user.id) ? (
                <FollowButton onClick={handleClickFollowButton}>
                  구독하기
                </FollowButton>
              ) : (
                <FollowButton onClick={handleClickUnfollowButton}>
                  구독 취소하기
                </FollowButton>
              )}
            </>
          )}
        </QuestionMetaDataBox>
        <TagBox>
          {question.tags.length > 0 &&
            question.tags.map((tag, i) => (
              <TagButton key={i}>{`#${tag}`}</TagButton>
            ))}
        </TagBox>
      </QuestionHeaderBox>
      <StickBox>
        <SideBarButton
          $voteState={checkVoteState(question.votes, user.username)}
          onClick={handleClickVoteButton}
        >
          <LikeIcon />
        </SideBarButton>
        <VoteBox>{question.votes.length}</VoteBox>
        <SideBarButton onClick={handleClickCopyUrl}>
          <ShareIcon />
        </SideBarButton>
      </StickBox>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              style={{
                display: "block",
                margin: "0.5rem auto",
                maxWidth: "80%",
                maxHeight: "auto",
              }}
            />
          ),
        }}
        urlTransform={urlTransform}
      >
        {question.body}
      </Markdown>
      {/* 여기에 velog처럼 사진 유저이름 팔로우 */}
      <CommentBox>
        <CommentTitle>{comments.length}개의 댓글</CommentTitle>
        <CommentInput
          placeholder="댓글을 작성해 보세요"
          value={commentInput}
          onChange={handleChangeComment}
          onKeyDown={handlePressShiftAndEnterToCommnet}
        />
        <CommentButtonBox>
          <CommentSubmitButton onClick={handleClickSubmitComment}>
            댓글 작성
          </CommentSubmitButton>
        </CommentButtonBox>
        <CommentListBox>
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
              />
            ))}
        </CommentListBox>
      </CommentBox>
    </QuestionBox>
  ) : (
    <LoadingCircle />
  );
};

export default QuestionPage;
