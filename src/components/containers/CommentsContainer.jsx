import React, { useState } from 'react'
import styled from "styled-components";
import CommentsList from '../presentations/CommentsList';
import PropTypes from 'prop-types';

const CommentsListBox = styled.div`
  margin: 2rem 2rem;
`;

const CommentsContainer = ({initialState}) => {
  const [comments, setComments] = useState(initialState)

  return (
    <CommentsListBox>
      <CommentsList comments={comments}/>
    </CommentsListBox>
  )
}

CommentsContainer.propTypes = {
  initialState:  PropTypes.array.isRequired,
}

CommentsContainer.propTypes = {
  initialState: PropTypes.array.isRequired,
}

export default CommentsContainer