import { useEffect, useState, useCallback } from "react";
import { StyledList } from "./StyledComponents";
import AddCommentForm from "./AddCommentForm";
import styled from "styled-components";
import CommentListItem from "../components/CommentListItem";

const CommentsContainer = styled.div`
  margin: 2rem 2rem;
`;


const CommentsBox = ({comments}) => {
  const [ commentsState, setCommentsState ] = useState([])
  useEffect(() => {
    setCommentsState(comments)
  }, [comments])
  return (
    <CommentsContainer>
        <StyledList>
          {commentsState &&
            commentsState.length > 0 &&
            commentsState.map((comment) => (
              <CommentListItem
                key={comment.id}
                comment={comment}
                setCommentsState={setCommentsState}
              />
            ))}
        </StyledList>
        <AddCommentForm setCommentsState={setCommentsState}/>
      </CommentsContainer>
  )
}

export default CommentsBox