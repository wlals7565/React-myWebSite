import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import RecommendingButton from '../RecommendingButton'
import { recommendsToComment } from '../../api/comment'
import PropTypes from 'prop-types'

const RecommendationsContainer = ({initialState, commentId}) => {
  const [recommendations, setRecommendations] = useState(initialState)
  const { user } = useContext(UserContext)
  const [ upvoteState, setUpvoteState] = useState(false)

  // 고칠 부분
  const handleClickUpVote = async () => {
    recommendsToComment(commentId).then(({ data }) => {
      if(data.id) {
        setRecommendations((prev) => [...prev, data])
        setUpvoteState(true);
      }
      else {
        setRecommendations((prev) => prev.filter((val) => val.recommender.id !== user.id))
        setUpvoteState(false);
      }
    });
  }

  // 나중에 구현할 부분
  //const handleClickReportButton = () => {}

  // 고칠 부분
  useEffect(() => {
    setUpvoteState(
      recommendations.some(
        (recommend) => recommend.recommender.id === user.id
      )
    );
  }, [recommendations, user]);


  return (
    <RecommendingButton
        recommendations={recommendations}
        handleClickUpVote={handleClickUpVote}
        handleClickReportButton={()=>{}}
        upvoteState={upvoteState}
      />
  )
}

RecommendationsContainer.propTypes = {
  initialState: PropTypes.array.isRequired,
  commentId: PropTypes.string.isRequired
}

export default React.memo(RecommendationsContainer);