import styled from "styled-components";
import { BlueButton, Header, PreviewArea } from "../StyledComponents";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AnswerBodyTextarea = styled.textarea`
  background: none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  min-height: 200px;
  margin-bottom: 20px;
  color: #fff;
  font-family: inherit;
`;

const AnswerBox = ({ handleChangeOnAnswerBody, handleClickPostAnswerButton, answerBody }) => {
  
  return (
    <>
      <Header>Your Answer</Header>
      <AnswerBodyTextarea
        placeholder="post your answer. you can use markdown"
        value={answerBody}
        onChange={handleChangeOnAnswerBody}
      ></AnswerBodyTextarea>
      <PreviewArea>
          <Markdown remarkPlugins={[remarkGfm]}>{answerBody}</Markdown>
        </PreviewArea>
      <BlueButton onClick={handleClickPostAnswerButton}>Post Your Answer</BlueButton>
    </>
  );
};

export default AnswerBox;