import PropTypes from 'prop-types';
import React from 'react'
export const Tag = styled.a`
  display: inline-block;
  margin-right: 5px;
  background-color: #3e4a52;
  color: #9cc3db;
  border: 0;
  padding: 7px;
  border-radius: 5px;
  font-size: 0.9rem;
  &:hover {
    background-color: #5e6a72;
    color: #bce3fb;
  }
`;


const TagsListItem = ({tag}) => {
  return (
    <Tag>{tag}</Tag>
  )
}

TagsListItem.propTypes = {
  tag: PropTypes.string.isRequired
}

export default TagsListItem