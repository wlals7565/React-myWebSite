import styled from "styled-components";
import BlueButton from "../components/BlueButton";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useState } from "react";

const Container = styled.div`
  padding: 30px 20px;
`;

const QuestionTitleInput = styled.input`
  background: none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  color: #fff;
`;

const QuestionBodyTextarea = styled.textarea`
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

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: white;
`;

const PreviewArea = styled.div`
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  margin-bottom: 20px;
  
  h1 {
    font-size: 2.5rem; /* 기본 크기 */
    font-weight: bold; /* 기본 두께 */
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h1 */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h2 */
  }

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h3 */
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h4 */
  }

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h5 */
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h6 */
  }

  p {
    font-size: 1rem; /* 기본 문단 크기 */
    color: #ccc;
    line-height: 1.5;
    margin-bottom: 10px;
    /* Log: Applied styles for p */
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 20px;
    color: #ccc;
    margin-bottom: 10px; /* 목록 하단 여백 */
    /* Log: Applied styles for ul, ol */
  }

  code {
    font-family: monospace; /* 코드에 적합한 폰트 */
    background-color: #333;
    color: #0f0;
    padding: 2px 4px;
    border-radius: 3px;
    /* Log: Applied styles for code */
  }

  blockquote {
    border-left: 3px solid #777;
    padding-left: 10px;
    color: #aaa;
    margin-bottom: 10px;
    font-style: italic;
    font-size: 1rem; /* 기본 크기 */
    /* Log: Applied styles for blockquote */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
    margin-bottom: 10px; /* 테이블 하단 여백 */
    /* Log: Applied styles for table */
  }

  th,
  td {
    border: 1px solid #777;
    padding: 5px 10px;
    font-size: 1rem; /* 기본 텍스트 크기 */
    /* Log: Applied styles for th, td */
  }

  th {
    background-color: #555;
    font-weight: bold; /* 테이블 헤더 강조 */
    /* Log: Applied styles for th */
  }
`;

const AskPage = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");

  const handleChangeQuestionTitle = useCallback((e) => {
    setQuestionTitle(e.target.value);
  }, []);

  const handleChangeBodyTextarea = useCallback((e) => {
    setQuestionBody(e.target.value);
  }, []);

  return (
    <Container>
      <StyledHeader>Ask a public question</StyledHeader>
      <QuestionTitleInput
        type="text"
        placeholder="Title of your question"
        value={questionTitle}
        onChange={handleChangeQuestionTitle}
      />
      <QuestionBodyTextarea
        placeholder="More Info about your question. You can use markdown here."
        value={questionBody}
        onChange={handleChangeBodyTextarea}
      ></QuestionBodyTextarea>
      <PreviewArea>
        <Markdown remarkPlugins={[remarkGfm]}>{questionBody}</Markdown>
      </PreviewArea>
      <BlueButton>Post Question</BlueButton>
    </Container>
  );
};

export default AskPage;
