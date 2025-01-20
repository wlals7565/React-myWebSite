import React from "react";
import TagsListItem from "./TagsListItem";
import PropTypes from "prop-types";

const TagsList = ({ tags }) => {
  return (
    <>
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => {
          <TagsListItem tag={tag} key={tag.id} />;
        })}
    </>
  );
};

TagsList.propTypes = {
  tags: PropTypes.array.isRequired
}

export default TagsList;
