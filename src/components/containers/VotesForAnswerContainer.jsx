import React, { useContext, useState, useEffect, useCallback } from "react";
import VotingButton from "../presentations/VotingButton";
import { voteToAnswer } from "../../api/answer";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";

const upVote = 1;
const downVote = -1;


const VotesForAnswerContainer = ({ initialState, answerId }) => {
  const [votes, setVotes] = useState(initialState);
  const [myVotingState, setVoteState] = useState(0);
  const { user } = useContext(UserContext);
 
  useEffect(() => {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].voter.id === user.id && votes[i].state === 1) {
        setVoteState(1);
        return;
      } else if (votes[i].voter.id === user.id && votes[i].state === -1) {
        setVoteState(-1);
        return;
      }
    }
    setVoteState(0);
    return;
  }, [user, votes]);

  const handleClickUpVote = useCallback(() => {
    voteToAnswer(answerId, upVote).then(({ data }) => {
      setVotes((prev) => prev.filter((vote) => vote.voter.id !== user.id));
      if (!data) return;
      setVotes((prev) => [...prev, data]);
    });
  }, [user, answerId]);

  const handleClickDownVote = useCallback(() => {
    voteToAnswer(answerId, downVote).then(({ data }) => {
      setVotes((prev) => prev.filter((vote) => vote.voter.id !== user.id));
      if (!data) return;
      setVotes((prev) => [...prev, data]);
    });
  }, [user, answerId]);


  return (
    <VotingButton
      votes={votes}
      handleClickUpVote={handleClickUpVote}
      handleClickDownVote={handleClickDownVote}
      voteState={myVotingState}
    ></VotingButton>
  );
};

VotesForAnswerContainer.propTypes = {
  initialState: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    voter: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  })),
  answerId: PropTypes.string.isRequired,
};

export default VotesForAnswerContainer;

/*
{
					"id": "dd72ff61-0d90-44c8-a448-aa426c42dc10",
					"state": 1,
					"createdAt": "2025-01-18T01:01:23.472Z",
					"updatedAt": "2025-01-18T01:01:24.722Z",
					"voter": {
						"id": "274027bb-6142-42d6-b6ad-676f3e727670",
						"name": "testtest",
						"email": "test1212@naver.com"
					}
				}
*/
