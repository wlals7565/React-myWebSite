import styled from 'styled-components';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router';

const UserLink = styled.a`
  color: #3ca4ff;
`
const StyleQuestionRow = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: repeat(3, 80px) 1fr;
  border-top: 1px solid #555;
`;

const QuestionStat = styled.div`
  padding: 5px 10px 0;
  font-size: 2rem;
  text-align: center;
  display: inline-block;
  color: #aaa;
  margin-top: 6px;
  span {
    font-size: 0.9rem;
    display: block;
    font-weight: 300;
    margin-top: 4px;
  }
`;

const QuestionTitleArea = styled.div`
  padding: 0 20px;
`;

const Tag = styled.div`
  display: inline-block;
  margin-right: 5px;
  background-color: #3e4a52;
  color: #9cc3db;
  border: 0;
  padding: 7px;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const QuestionLink = styled.a`
  text-decoration: none;
  color: #3ca4ff;
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: block;
`;

const WhoAndWhen = styled.div`
  color: #aaa;
  font-size: .8rem;
  float: right;
  padding: 10px 0;
`

const QuestionListItem = ({question}) => {
  const navigate = useNavigate()
  const handleClickQuestion = () => {
    navigate(`/questions/${question.id}`)
  }
  return (
    <StyleQuestionRow>
      <QuestionStat>
        {question.votes.length}<span>votes</span>
      </QuestionStat>
      <QuestionStat>
        {question.answerCount}<span>answers</span>
      </QuestionStat>
      <QuestionStat>
        {question.views}<span>views</span>
      </QuestionStat>
      <QuestionTitleArea>
        <QuestionLink onClick={handleClickQuestion}>{question.title}</QuestionLink>
        <WhoAndWhen> asked 10 minutes ago <UserLink>{question.author?.name || 'unknown'}</UserLink></WhoAndWhen>
        {question.tags && question.tags.length> 0 &&
          question.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
          }
      </QuestionTitleArea>
    </StyleQuestionRow>
  );
};

QuestionListItem.propTypes =  {
  question: PropTypes.shape({
    id:  PropTypes.string.isRequired,
    votes: PropTypes.array.isRequired,
    answerCount: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    views: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name:  PropTypes.string.isRequired,
      email:  PropTypes.string.isRequired,
    })
  })


}

export default QuestionListItem