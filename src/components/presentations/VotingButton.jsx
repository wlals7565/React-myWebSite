import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect } from "react";


const CircleUpButton = styled.button`
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  background-color: ${({ $state }) => ($state === 1 ? "grey" : "inherit")};
  margin: 0.5rem;
  border: 2px solid white;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const CircleDownButton = styled.button`
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  background-color: ${({ $state }) => ($state === -1 ? "grey" : "inherit")};
  margin: 0.5rem;
  border: 2px solid white;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const VotingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const VoteCountDiv = styled.div`
  font-size: 3rem;
`;

const VotingButton = ({ votes, voteState, handleClickUpVote, handleClickDownVote }) => {

  return (
    <VotingBox>
      <CircleUpButton $state={voteState} onClick={handleClickUpVote}>
        &#9650;
      </CircleUpButton>
      <VoteCountDiv>{votes && votes.length > 0 ? votes.reduce((prev, current) => prev+current.state ,0) : 0}</VoteCountDiv>
      <CircleDownButton $state={voteState} onClick={handleClickDownVote}>
        &#9660;
      </CircleDownButton>
    </VotingBox>
  );
};

VotingButton.propTypes = {
  voteState: PropTypes.number.isRequired,
  votes: PropTypes.array.isRequired,
  handleClickDownVote: PropTypes.func.isRequired,
  handleClickUpVote: PropTypes.func.isRequired,
}

export default VotingButton;
