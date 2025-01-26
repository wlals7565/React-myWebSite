import PropTypes from "prop-types";
import React from "react";
import { StyledList } from "../StyledComponents";
import RepliesListItem from "./RepliesListItem";

const RepliesList = ({ replies }) => {
  return (
    <StyledList>
      {replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <RepliesListItem key={reply.id} reply={reply} />
        ))}
    </StyledList>
  );
};

RepliesList.propTypes = {
  replies: PropTypes.array.isRequired,
};

export default RepliesList;
