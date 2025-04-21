import { useState } from "react";
import styled from "styled-components";
import Reply from "./Reply";
import { getAllReply, replyToComment } from "../../../api/comment";
import PropTypes from "prop-types";
import { useParams, useSearchParams } from "react-router";

// 대충
// [ 댓글들 ]
// [ 댓글 다는 영역]
// [댓글 달기 버튼]

const ReplyListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
  border: none;
  border-radius: 10px;
  background-color: #e5e5e5;
  padding: 1rem;
`;

const ReplyListToggleBox = styled.div`
  display: flex;
  justify-content: start;
`;

const ReplyListOpenButton = styled.button`
  background: none;
  border: none;
  color: #0074e5;
  cursor: pointer;
  padding-left: 1rem;
  margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
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

const ReplyList = ({ commentId, replyCount, commenterId }) => {
  const [replies, setReplies] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const {id} = useParams()

  const handleChangeReplyBody = (e) => {
    setReplyBody(e.target.value);
  };

  const handleClickReplyToggleButton = () => {
    setIsOpen((prev) => !prev);
    if (replies) return;
    getAllReply(commentId).then(({ data }) => {
      console.log(data);
      setReplies(data);
    });
  };

  // 답글 추가 
  const handleClickAddReply = async (commenter = undefined, body = undefined) => {
    try {
      if (body? !body.trim() : !replyBody.trim()) {
        alert("내용을 입력해주세요.");
      }
      const {data} = await replyToComment(commentId, body ? body : replyBody, commenter ? commenter.id : commenterId, id );
      console.log(data.result)
      setReplies((prev) => [...prev, data.result ])
      setReplyBody("");
    } catch (error) {
      console.error(error);
    }
  };

  // 답글 추가 이벤트 받는 함수
  const ClickAddReply = async () => {
    await handleClickAddReply()
  }

  const handleEditReply = (replyId, body) => {
    setReplies((prev) => prev.map((reply) => reply.id !== replyId ? reply : {...reply, body: body}))
  }

  const handleDeleteReply = (replyId) => {
    setReplies((prev) => prev.filter((reply) => reply.id !== replyId ))
  }

  return (
    <>
      <ReplyListToggleBox>
        <ReplyListOpenButton onClick={handleClickReplyToggleButton}>
          {isOpen
            ? "숨기기 ▲"
            : replyCount
            ? `${replyCount}개의 답글 보기 ▼`
            : "답글 달기 ▼"}
        </ReplyListOpenButton>
      </ReplyListToggleBox>
      {isOpen ? (
        <ReplyListBox>
          <>
            {replies &&
              replies.length > 0 &&
              replies.map((reply) => <Reply key={reply.id} reply={reply} handleEditReply={handleEditReply} handleDeleteReply={handleDeleteReply} handleClickAddReply={handleClickAddReply} />)}
          </>
          <ReplyTextarea
            placeholder="답글을 작성하세요."
            onChange={handleChangeReplyBody}
            value={replyBody}
          ></ReplyTextarea>
          <ButtonBox>
            <BlueButton onClick={ClickAddReply}> 답글 달기</BlueButton>
          </ButtonBox>
        </ReplyListBox>
      ) : undefined}
    </>
  );
};

ReplyList.propTypes = {
  commentId: PropTypes.string.isRequired,
  replyCount: PropTypes.number.isRequired,
  commenterId: PropTypes.string.isRequired,
};

export default ReplyList;
