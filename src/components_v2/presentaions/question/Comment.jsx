import styled from "styled-components";
import { formatDate } from "../../../utilities/data";

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
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const UserProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
`

const Comment = ({ comment }) => {
  return (
    <CommentBox>
      <CommentInfo>
        <UserProfileImageBox>
          <UserProfileImage
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?d=identicon"
            alt="Gravatar Image"
          />
        </UserProfileImageBox>
        <CommentPublishInfo>
          <UserNameBox>{comment.author.name}</UserNameBox>
          <CommentDateBox>{formatDate(comment.createdAt)}</CommentDateBox>
        </CommentPublishInfo>
      </CommentInfo>
      <CommentBody>{comment.body}</CommentBody>
    </CommentBox>
  );
};

export default Comment;
