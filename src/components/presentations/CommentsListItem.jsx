import PropTypes from "prop-types";
import React from "react";
import { UserLink } from "../StyledComponents";
import styled from "styled-components";
import RecommendationsContainer from "../containers/RecommendationsContainer";

const CommentItemBox = styled.li`
  display: flex;
`;

const CommentsListItem = ({ comment }) => {
  return (
    <CommentItemBox>
      <RecommendationsContainer initialState={comment.recommendations} commentId={comment.id} />
      <div>
        <div>{comment.body}</div>
        <div>
          - Commented by <UserLink>{comment.author?.name}</UserLink>
        </div>
      </div>
    </CommentItemBox>
  );
};

CommentsListItem.propTypes = {
  comment: PropTypes.shape({
    recommendations: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    deletedAt: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }),
};

export default CommentsListItem;
