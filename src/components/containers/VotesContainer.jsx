import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { voteToPost } from "../../api/post";
import UserContext from "../../contexts/UserContext";
import VotingButton from "../presentations/VotingButton";
import PropTypes from "prop-types";

const upVote = 1;
const downVote = -1;

const VotesContainer = ({ initialState }) => {
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState(initialState);
  const [voteState, setVoteState] = useState(0);
  const { id } = useParams();

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
  }, [id, user, votes]);

  const handleClickUpVote = useCallback(() => {
    voteToPost(id, upVote).then(({ data }) => {
      setVotes((prev) => prev.filter((vote) => vote.voter.id !== user.id));
      if (!data) return;
      setVotes((prev) => [...prev, data]);
    });
  }, [id, user]);

  const handleClickDownVote = useCallback(() => {
    voteToPost(id, downVote).then(({ data }) => {
      setVotes((prev) => prev.filter((vote) => vote.voter.id !== user.id));
      if (!data) return;
      setVotes((prev) => [...prev, data]);
    });
  }, [id, user]);

  return (
    <>
      <VotingButton
        voteState={voteState}
        handleClickDownVote={handleClickDownVote}
        handleClickUpVote={handleClickUpVote}
        votes={votes}
      />
    </>
  );
};

VotesContainer.propTypes = {
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
};

export default VotesContainer;
