import { UserLink } from "./StyledComponents";
import RecommendingButton from "./RecommendingButton";
import styled from "styled-components";
import { useCallback, useContext, useEffect, useState } from "react";
import { recommands } from "../api/comment";
import UserContext from "../contexts/UserContext";

const CommentItemBox = styled.li`
  display: flex;
`;

const RecommandCountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 3rem;
`;

const CommentListItem = ({ comment, setPost, index }) => {
  const { user } = useContext(UserContext);
  const [upvoteState, setUpvoteState] = useState(false);
  const handleClickUpVote = useCallback(async () => {
    recommands(comment.id).then(({ data }) => {
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.map((comment, i) =>
          index === i ? { ...comment, recommands: data } : comment
        ),
      }));
      setUpvoteState(
        data.some((recommand) => recommand.recommander.id === user.id)
      );
    });
  }, [index, setPost, comment, user]);

  useEffect(() => {
    setUpvoteState(
      comment.recommands.some(
        (recommand) => recommand.recommander.id === user.id
      )
    );
  }, [comment, user]);

  const handleClickReportButton = useCallback(() => {
    return;
  }, []);

  return (
    <CommentItemBox>
      <RecommandCountBox>{comment.recommands.length || 0}</RecommandCountBox>
      <RecommendingButton
        handleClickUpVote={handleClickUpVote}
        handleClickReportButton={handleClickReportButton}
        upvoteState={upvoteState}
      />
      <div>
        <div>{comment.body}</div>
        <div>
          - Commented by <UserLink>{comment.author?.name}</UserLink>
        </div>
      </div>
    </CommentItemBox>
  );
};

export default CommentListItem;
