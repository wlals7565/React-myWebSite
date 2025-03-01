import { useState, useEffect } from "react";
import QuestionList from "../presentations/QuestionList";
import PropTypes from "prop-types";

const QuestionsContainer = ({initialState}) => {
  // 게시글 정보
  const [questions, setQuestions] = useState([]);
	useEffect(() => {
		setQuestions(initialState)
	}, [initialState])
  return (
    <>
      <QuestionList questions={questions}/>
    </>
  )
}

QuestionsContainer.propTypes = {
  initialState: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			body: PropTypes.string.isRequired,
			tags: PropTypes.arrayOf(PropTypes.string),
			views: PropTypes.number.isRequired,
			createdAt: PropTypes.string.isRequired,
			updatedAt: PropTypes.string.isRequired,
			deletedAt: PropTypes.string,
			author: PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				email: PropTypes.string.isRequired
			}),
			votes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        state: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      })),
			answerCount: PropTypes.number.isRequired,
  }))
}

export default QuestionsContainer