import styled from "styled-components";
import QuestionRow from "../components/QuestionRow";
import BlueButtonLink from "../components/BlueButtonLink";

const StyledHeader = styled.h1`
  font-size: 1.6rem;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 30px 20px;
  color: white;
`;

const QuestionPage = () => {
  return (
    <main>
      <HeaderRow>
        <StyledHeader>Top Questions</StyledHeader>
        <BlueButtonLink to={`/ask`}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
      <QuestionRow />
    </main>
  );
};

export default QuestionPage;
