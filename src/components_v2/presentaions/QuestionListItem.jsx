import React from 'react'
import PropTypes from "prop-types";

const QuestionListItem = ({question}) => {
  return (
    <div>QuestionListItem</div>
  )
}

QuestionListItem.propTypes =  {
  question: PropTypes.shape({
    id:  PropTypes.string.isRequired,
    votes: PropTypes.array.isRequired,
    answerCount: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    views: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name:  PropTypes.string.isRequired,
      email:  PropTypes.string.isRequired,
    })
  })
}

export default QuestionListItem