import PropTypes from "prop-types";
import QuestionListItem from "./QuestionListItem";

const QuestionList = ({ questionList }) => {
  return (
    <>
      {questionList &&
        questionList.length > 0 &&
        questionList.map((question) => (
          <QuestionListItem key={question.id} question={question} />
        ))}
    </>
  );
};
QuestionList.propTypes = {
  questionList: PropTypes.array.isRequired,
};

export default QuestionList;
