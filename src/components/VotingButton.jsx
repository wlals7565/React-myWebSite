import styled from "styled-components";


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

const VotingButton = ({ votes, state, handleClickUpVote, handleClickDownVote }) => {
  

  return (
    <VotingBox>
      <CircleUpButton $state={state} onClick={handleClickUpVote}>
        &#9650;
      </CircleUpButton>
      <VoteCountDiv>{votes}</VoteCountDiv>
      <CircleDownButton $state={state} onClick={handleClickDownVote}>
        &#9660;
      </CircleDownButton>
    </VotingBox>
  );
};

export default VotingButton;
