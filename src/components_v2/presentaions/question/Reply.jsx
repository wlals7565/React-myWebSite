import styled from "styled-components";
import { formatDate } from "../../../utilities/data";
import { useContext, useState } from "react";
import { deleteReply, patchReply } from "../../../api/reply";
import PropTypes from "prop-types";
import UserContext from "../../../contexts/user/UserContext";

const ReplyInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const ReplyPublishInfo = styled.div`
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

const ReplyDateBox = styled.div`
  color: #868e96;
`;

const ReplyBody = styled.div`
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

const EditButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
`;

const StyledButton = styled.button`
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

const To = styled.span`
  margin-right: 1rem;
  color: #555555;
`

const ReplyTextarea = styled.textarea`
  min-height: 6rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  overflow: auto;
  box-sizing: border-box;
  margin-top: 1rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: #0074e5;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #246beb;
  width: fit-content;
  height: fit-content;

  cursor: pointer;
`;

const ReplyBox = styled.div`
  border-bottom: 1px solid black;
  padding: 2rem 0;
`;

const ReplyEditArea = styled.textarea`
  font-size: 1.2rem;
  width: 100%;
  min-height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: inherit;
  resize: none;
`;

const BlueButton = styled.button`
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  background-color: #246beb;
  padding: 0.5rem 1rem;
  color: #ffffff;

  &:hover {
    background-color: #1d56bc;
  }

  &:active {
    background-color: #16408d;
  }
`;

const ProfileImageURL = import.meta.env.VITE_API_URL + "/static/images";

const Reply = ({ reply, handleEditReply, handleDeleteReply, handleClickAddReply }) => {
  const { user } = useContext(UserContext);

  // 답글 토글 상태
  const [toggle, setToggle] = useState(false);

  // 답글 수정
  const [isEditing, setIsEditing] = useState(false);

  // 답글 수정 본문
  const [editedBody, setEditedBody] = useState("");

  // 답글에 대한 답글 본문
  const [replyBody, setReplyBody] = useState("")

  // 답글 수정 버튼 클릭시
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedBody(reply.body);
  };

  // 답글 수정 취소 버튼 클릭시
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // 답글 저장 버튼 클릭시
  const handleSaveEdit = async () => {
    if (editedBody.trim() === "") return;
    try {
      await patchReply(reply.id, editedBody);
      alert("답글이 성공적으로 수정되었습니다.");
      handleEditReply(reply.id, editedBody);
    } catch (error) {
      alert(
        "서버 오류로 인해 답글을 수정하지 못했습니다. 나중에 다시 시도해주세요."
      );
      console.error(error);
    }
    setIsEditing(false);
  };

  // 답글 삭제
  const handleDeleteClick = async () => {
    if (confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteReply(reply.id)
        alert("답글이 성공적으로 삭제되었습니다.")
        handleDeleteReply(reply.id)
      } catch (error) {
        alert(
          "서버 오류로 인해 답글을 수정하지 못했습니다. 나중에 다시 시도해주세요."
        );
        console.error(error);
      }
    }
  };

  // 토글 클릭 시
  const handleClickToggle = () => {
    setToggle((prev) => !prev);
  };

  // reply에 대한 reply로 기억하는데
  const handleClickReplyToReply = async  () => {
    await handleClickAddReply(reply.author, replyBody)
    alert("성공적으로 답글이 달렸습니다.")
    setReplyBody("")
    setToggle((prev) => !prev)

  };
  return (
    <ReplyBox>
      <ReplyInfo>
        <UserProfileImageBox>
          <UserProfileImage
            src={`${ProfileImageURL}/${reply.author.name}/${reply.author.image}.png`}
            alt="User Profile Image"
          />
        </UserProfileImageBox>
        <ReplyPublishInfo>
          <UserNameBox>{reply.author.name}</UserNameBox>
          <ReplyDateBox>{formatDate(reply.createdAt)}</ReplyDateBox>
        </ReplyPublishInfo>
        {reply.author.id === user.id ? (
          <ButtonBox>
            {!isEditing && <Button onClick={handleEditClick}>수정</Button>}
            <Button onClick={handleDeleteClick}>삭제</Button>
          </ButtonBox>
        ) : undefined}
      </ReplyInfo>
      {isEditing ? (
        <>
          <ReplyEditArea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <EditButtonBox>
            <StyledButton onClick={handleSaveEdit}>저장</StyledButton>
            <StyledButton onClick={handleCancelEdit}>취소</StyledButton>
          </EditButtonBox>
        </>
      ) : undefined}
      <ReplyBody><To>{`@${reply.to.name}님에게`}</To>{reply.body}</ReplyBody>
      {toggle ? (
        <ToggleButton onClick={handleClickToggle}>숨기기 ▲</ToggleButton>
      ) : (
        <ToggleButton onClick={handleClickToggle}>답글 달기 ▼</ToggleButton>
      )}
      {toggle ? (
        <>
          <ReplyTextarea
            placeholder={`${reply.author.name}에게 댓글 작성하기`} value={replyBody} onChange={(e) => setReplyBody(e.target.value)}
          ></ReplyTextarea>
          <ButtonBox>
            <BlueButton onClick={handleClickReplyToReply}>
              {" "}
              답글 달기
            </BlueButton>
          </ButtonBox>
        </>
      ) : undefined}
    </ReplyBox>
  );
};

Reply.propTypes = {
  reply: PropTypes.shape({
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    to: PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  handleEditReply: PropTypes.func.isRequired,
  handleDeleteReply: PropTypes.func.isRequired,
  handleClickAddReply: PropTypes.func.isRequired,
};

export default Reply;
