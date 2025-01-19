import { useState } from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";

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

const AddCommentForm = () => {
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const handleClickAddACommentButton = () => {
    setShowAddCommentForm(!showAddCommentForm);
  };
  return (
    <div>
      {!showAddCommentForm && (
        <AddCommentButton onClick={handleClickAddACommentButton}>
          Add a comment
        </AddCommentButton>
      )}
      {showAddCommentForm && (
        <CommentForm
          setShowAddCommentForm={setShowAddCommentForm}
        />
      )}
    </div>
  );
};

export default AddCommentForm;
