import PropTypes from "prop-types";
import QuestionListItem from "./QuestionListItem";
import styled from "styled-components";

const NoPostBox = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5rem;
`

const QuestionList = ({ questionList }) => {
  return (
    <>
      {questionList &&
        questionList.length > 0 ?
        questionList.map((question) => (
          <QuestionListItem key={question.id} question={question} />
        )) : <NoPostBox>검색에 맞는 게시글이 없습니다.</NoPostBox>}
    </>
  );
};
QuestionList.propTypes = {
  questionList: PropTypes.array.isRequired,
};

export default QuestionList;
