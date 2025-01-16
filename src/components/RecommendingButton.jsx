import styled from "styled-components";
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


const RecommendingButton = ({ handleClickUpVote, handleClickReportButton, upvoteState }) => {
  return (
    <VotingBox>
      <CircleUpButton onClick={handleClickUpVote} $upvoteState={upvoteState}>
        &#9650;
      </CircleUpButton>
      <ReportButton onClick={handleClickReportButton}>
      &#9872;
      </ReportButton>
    </VotingBox>
  );
};

export default RecommendingButton