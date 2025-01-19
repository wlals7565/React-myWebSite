import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { recommendsToComment } from "../api/comment";

const CircleUpButton = styled.button`
border-radius: 50%;
aspect-ratio: 1 / 1;
background-color: ${({ $upvoteState }) => ($upvoteState === true ? "grey" : "inherit")};
margin: 0.5rem;
border: 2px solid white;
font-size: 0.5rem;
color: white;
cursor: pointer;
`;

const ReportButton = styled.button`
background-color: ${({ $state }) => ($state === -1 ? "grey" : "inherit")};
margin: 0.5rem;
border: none;
font-size: 1.2rem;
color: white;
cursor: pointer;
`;

const VotingBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 2rem;
margin-right: 1rem;
`;

const RecommendCountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 3rem;
`;


// # TODO 신고 버튼 구현하기
const RecommendingButton = ({ recommends, commentId }) => {
  const { user } = useContext(UserContext)
  const [recommendsState, setRecommendsState] = useState(recommends)
  const [ upvoteState, setUpvoteState] = useState(false)


  const handleClickUpVote = async () => {
    recommendsToComment(commentId).then(({ data }) => {
      if(data.id) {
        setRecommendsState((prev) => [...prev, data])
        setUpvoteState(true);
      }
      else {
        setRecommendsState((prev) => prev.filter((val) => val.recommender.id !== user.id))
        setUpvoteState(false);
      }
    });
  }

  useEffect(() => {
    setUpvoteState(
      recommendsState.some(
        (recommend) => recommend.recommender.id === user.id
      )
    );
  }, [recommendsState, user]);

  const handleClickReportButton = () => {}
  return (
    <>
    <RecommendCountBox>{recommendsState.length || 0}</RecommendCountBox>
    <VotingBox>
      <CircleUpButton onClick={handleClickUpVote} $upvoteState={upvoteState}>
        &#9650;
      </CircleUpButton>
      <ReportButton onClick={handleClickReportButton}>
      &#9872;
      </ReportButton>
    </VotingBox>
    </>
  );
};

export default RecommendingButton