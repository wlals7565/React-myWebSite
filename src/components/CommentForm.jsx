import { addComment } from "../api/post";
import { BlueButton, TextArea } from "./StyledComponents";
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router";

const CommentFormBox = styled.div`
  margin-top: 2rem;
`;

const ButtonBox = styled.div`
  text-align: right;
`;

const CommentForm = ({setShowAddCommentForm, setCommentsState }) => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const handleClickAddCommentButton = () => {
    addComment(id, comment).then(({ data }) => {
      console.log(data);
      setComment("");
      setShowAddCommentForm(false);
      setCommentsState((prev) =>  [...prev, data]);
    });
  };

  return (
    <CommentFormBox>
      <TextArea
        style={{ minHeight: "5rem" }}
        placeholder={`Use comments to ask for more information or suggest improvements. Avoid answering questions in comments.`}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <ButtonBox>
        <BlueButton onClick={handleClickAddCommentButton}>
          Add a Comment
        </BlueButton>
      </ButtonBox>
    </CommentFormBox>
  );
};

export default CommentForm;
