import { UserLink } from "./StyledComponents";
import RecommendingButton from "./RecommendingButton";
import styled from "styled-components";

const CommentItemBox = styled.li`
  display: flex;
`;
const CommentListItem = ({ comment }) => {
  return (
    <CommentItemBox>
      <RecommendingButton
        recommends={comment.recommends}
        commentId={comment.id}
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
