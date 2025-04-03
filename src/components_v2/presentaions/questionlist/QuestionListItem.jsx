import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const UserLink = styled.a`
  color: #3ca4ff;
`;
const ItemBox = styled.div`
  background-color: #ffffff;
  padding: 15px 10px;
  border: 1px solid #555;
  border-radius: 20px;
  margin-bottom: 1rem;
  display: flex;
`;

const QuestionStats = styled.div`
  padding: 5px 10px 0;
  font-size: 2rem;
  text-align: center;
  display: inline-block;
  color: #555555;
  margin-top: 6px;
  span {
    font-size: 0.9rem;
    display: block;
    font-weight: 300;
    margin-top: 4px;
  }
`;

const Tag = styled.span`
  margin-right: 5px;
  border: none;
  background-color: #F0F0F0;
  color: #000000;
  border: 0;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #E4E4E4;
  }

  &:active {
    background-color: #D8D8D8;
  }
`;

const TagBox = styled.div`
  display: flex;
`;

const QuestionLink = styled.a`
  text-decoration: none;
  color: #246BEB;
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: block;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 1px solid transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* 부모 요소의 크기를 초과하면 말줄임표 적용 */
`;

const WhoAndWhen = styled.div`
  color: #aaa;
  font-size: 0.8rem;
  display: flex;
  margin-bottom: 0%.5rem;
  flex-direction: column;
  justify-content: flex-end;
`;

const QuesionStateBox = styled.div`
  margin-right: 1rem;
`;

const QuestionBodyBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionListItem = ({ question }) => {
  const navigate = useNavigate();
  const handleClickQuestion = () => {
    navigate(`/questions/${question.id}`);
  };
  return (
    <ItemBox>
      <QuesionStateBox>
        <QuestionStats>
          {question.votes.reduce((prev, current) => prev + current.state, 0)}
          <span>추천수</span>
        </QuestionStats>
        <QuestionStats>
          {question.commentCount}
          <span>답변수</span>
        </QuestionStats>
        <QuestionStats>
          {question.views}
          <span>조회수</span>
        </QuestionStats>
      </QuesionStateBox>
      <QuestionBodyBox>
        <QuestionLink onClick={handleClickQuestion}>
          {question.title}
        </QuestionLink>
        <TagBox>
          {question.tags &&
            question.tags.length > 0 &&
            question.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </TagBox>
      </QuestionBodyBox>
      <WhoAndWhen>
        {dayjs(question.createdAt).format("YYYY년 MM월 DD일 HH시 mm분")}
        <UserLink>{question.author?.name || "unknown"}</UserLink>
      </WhoAndWhen>
    </ItemBox>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    votes: PropTypes.array.isRequired,
    commentCount: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    views: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }),
};

export default QuestionListItem;
