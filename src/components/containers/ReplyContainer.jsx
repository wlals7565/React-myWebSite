import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import RepliesList from "../presentations/RepliesList";

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 24fr;
  margin-bottom: 2rem;
`;
const AddReplyButton = styled.button`
  color: #3ca4ff;
  text-decoration: none;
  background-color: transparent; /* 배경색을 투명으로 설정 */
  border: none; /* 테두리를 없앰 */
  border-radius: 0; /* 모서리 둥글게 설정 (0으로 하면 직각 모서리) */
  outline: none; /* 포커스 시 나타나는 외곽선 없애기 */
  padding: 0; /* 버튼 내부 여백 제거 */
  margin-top: 2rem;
  text-align: left;
`;

const BlankDiv = styled.div`
  padding-right: 2rem;
  visibility: hidden;
`;

const ReplyContainer = ({ initialState }) => {
  const [replies, setReplies] = useState(initialState);
  return (
    <GridBox>
      <BlankDiv>blank</BlankDiv>
      <RepliesList replies={replies} />
    </GridBox>
  );
};

ReplyContainer.propTypes = {
  initialState: PropTypes.array.isRequired,
};

export default ReplyContainer;
