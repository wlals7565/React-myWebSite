import React, { useState } from "react";
import TagsList from "../presentations/TagsList";
import PropTypes from "prop-types";

const TagsContainer = ({ initialState }) => {
  const [tags, setTags] = useState(initialState);
  return (
    <>
      <TagsList tags={tags} />
    </>
  );
};

TagsContainer.propTypes = {
  initialState: PropTypes.array.isRequired,
}

export default TagsContainer;
