import styled from "styled-components";
import { formatDate } from "../../../utilities/data";
import { useContext } from "react";
import UserContext from "../../../contexts/user/UserContext";
import { useState } from "react";
import PropTypes from "prop-types";

const CommentBox = styled.div`
  border-bottom: 1px solid #ccc8c8;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
const CommentInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const CommentPublishInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfileImageBox = styled.div`
  margin-right: 2rem;
`;

const UserNameBox = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CommentDateBox = styled.div`
  color: #868e96;
`;

const CommentBody = styled.div`
  padding-left: 1rem;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const UserProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  object-fit: cover;
  object-position: center;
`;

const ButtonBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  color: black;
  padding: 0.5rem;
  background-color: #ffffff;
  font-weight: bold;
  border: 1px solid;
  border-radius: 10px;
  margin-right: 1rem;
  cursor: pointer;
  height: fit-content;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #e4e4e4;
  }
`;

const EditButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const CommentEditArea = styled.textarea`
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  width: 100%;
  min-height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: inherit;
  resize: none;
`;

const ProfileImageURL = import.meta.env.VITE_API_URL + "/static/images";

const Comment = ({ comment, onDeleteComment, onUpdateComment }) => {
  const { user } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState("");

  // 댓글 수정 버튼 클릭시
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedBody(comment.body);
  };

  // 댓글 수정 취소 버튼 클릭시
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBody(comment.body);
  };

  // 댓글 저장 버튼 클릭시
  const handleSaveEdit = () => {
    if (editedBody.trim() === "") return;

    onUpdateComment(comment.id, editedBody);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      onDeleteComment(comment.id);
    }
  };

  return (
    <CommentBox>
      <CommentInfo>
        <UserProfileImageBox>
          <UserProfileImage
            src={`${ProfileImageURL}/${comment.author.name}/${comment.author.image}.png`}
            alt="Gravatar Image"
          />
        </UserProfileImageBox>
        <CommentPublishInfo>
          <UserNameBox>{comment.author.name}</UserNameBox>
          <CommentDateBox>{formatDate(comment.createdAt)}</CommentDateBox>
        </CommentPublishInfo>
        {user.id === comment.author.id ? (
          <ButtonBox>
            {!isEditing && <Button onClick={handleEditClick}>수정</Button>}
            <Button onClick={handleDeleteClick}>삭제</Button>
          </ButtonBox>
        ) : undefined}
      </CommentInfo>
      {isEditing ? (
        <>
          <CommentEditArea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <EditButtonBox>
            <Button onClick={handleSaveEdit}>저장</Button>
            <Button onClick={handleCancelEdit}>취소</Button>
          </EditButtonBox>
        </>
      ) : (
        <>
        <CommentBody>{comment.body}</CommentBody>
        </>
      )}
    </CommentBox>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    deletedAt: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
};

export default Comment;
