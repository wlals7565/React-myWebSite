import PropTypes from 'prop-types';
import QuestionListItem from "./QuestionListItem";

const QuestionsList = ({ questions }) => {
  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((question) => <QuestionListItem key={question.id} question={question} />)}
    </>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default QuestionsList;
