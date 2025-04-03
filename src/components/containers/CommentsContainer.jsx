import React, { useState } from "react";
import styled from "styled-components";
import CommentsList from "../presentations/CommentsList";
import PropTypes from "prop-types";
import { BlueButton, TextArea } from "../StyledComponents";
import { addComment } from "../../api/post";

const CommentFormBox = styled.div`
  margin-top: 2rem;
`;

const ButtonBox = styled.div`
  text-align: right;
`;

const CommentsBox = styled.div`
  margin: 2rem 2rem;
`;

const AddCommentButton = styled.button`
  color: #3ca4ff;
  text-decoration: none;
  background-color: transparent; /* 배경색을 투명으로 설정 */
  border: none; /* 테두리를 없앰 */
  border-radius: 0; /* 모서리 둥글게 설정 (0으로 하면 직각 모서리) */
  outline: none; /* 포커스 시 나타나는 외곽선 없애기 */
  padding: 0; /* 버튼 내부 여백 제거 */
  margin-top: 2rem;
`;

const CommentsContainer = ({ initialState, questionId }) => {
  const [comments, setComments] = useState(initialState);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  // comment 작성 양식을 보여주는 기능
  const handleClickAddACommentButton = () => {
    setShowAddCommentForm(!showAddCommentForm);
  };
  // 작성한 comment를 게시하는 기능
  const handleClickPostCommentButton = () => {
    addComment(questionId, commentBody).then(({ data }) => {
      setCommentBody("");
      setShowAddCommentForm(false);
      setComments((prev) => [...prev, data]);
    });
  };

  return (
    <>
      <CommentsBox>
        <CommentsList comments={comments} />
        {showAddCommentForm ? (
          <CommentFormBox>
            <TextArea
              style={{ minHeight: "5rem" }}
              placeholder={`Use comments to ask for more information or suggest improvements. Avoid answering questions in comments.`}
              onChange={(e) => setCommentBody(e.target.value)}
              value={commentBody}
            />
            <ButtonBox>
              <BlueButton onClick={handleClickPostCommentButton}>
                Post a Comment
              </BlueButton>
            </ButtonBox>
          </CommentFormBox>
        ) : (
          <AddCommentButton onClick={handleClickAddACommentButton}>
            Add a comment
          </AddCommentButton>
        )}
      </CommentsBox>
    </>
  );
};

CommentsContainer.propTypes = {
  initialState: PropTypes.array.isRequired,
  questionId: PropTypes.string.isRequired,
};

export default CommentsContainer;
