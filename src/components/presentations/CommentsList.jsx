import React from 'react'
import { StyledList } from '../StyledComponents'
import CommentsListItem from './CommentsListItem'
import PropTypes from 'prop-types'

const CommentsList = ({comments}) => {
  return (
    <StyledList>
      {comments && comments.length > 0 && comments.map((comment) => <CommentsListItem key={comment.id} comment={comment} />)}
    </StyledList>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default CommentsList