import styled from "styled-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

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
const RecommendingButton = ({ recommendations, handleClickUpVote, handleClickReportButton, upvoteState }) => {
  return (
    <>
    <RecommendCountBox>{recommendations.length || 0}</RecommendCountBox>
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

RecommendingButton.propTypes = {
  recommendations: PropTypes.array.isRequired,
  handleClickUpVote: PropTypes.func.isRequired,
  handleClickReportButton: PropTypes.func.isRequired,
  upvoteState: PropTypes.bool.isRequired
}

export default RecommendingButton