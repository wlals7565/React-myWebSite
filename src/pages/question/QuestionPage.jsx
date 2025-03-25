import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getQuestion } from "../../api/post";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const urlTransform = (url, key, node) => {
  return url; // URL을 그대로 반환
};

const QuestionBox = styled.div`
  flex: 1;
  padding: 5rem 2rem;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  background-color: #ffffff;

  h1 {
    font-size: 2.5rem; /* 기본 크기 */
    font-weight: bold; /* 기본 두께 */
    margin-bottom: 10px;
    /* Log: Applied styles for h1 */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h2 */
  }

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h3 */
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h4 */
  }

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h5 */
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h6 */
  }

  p {
    font-size: 1rem; /* 기본 문단 크기 */
    line-height: 1.5;
    margin-bottom: 10px;
    /* Log: Applied styles for p */
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 20px;
    margin-bottom: 10px; /* 목록 하단 여백 */
    /* Log: Applied styles for ul, ol */
  }

  code {
    font-family: monospace; /* 코드에 적합한 폰트 */
    background-color: #ebf5ff;
    padding: 2px 4px;
    border-radius: 3px;
    /* Log: Applied styles for code */
  }

  blockquote {
    border-left: 3px solid #777;
    padding-left: 10px;
    margin-bottom: 10px;
    font-style: italic;
    font-size: 1rem; /* 기본 크기 */
    /* Log: Applied styles for blockquote */
  }

  table {
    width: 100%;
    border-collapse: collapse;
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

const QuestionHeaderBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitleBox = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const QuestionMetaDataBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    getQuestion(id)
      .then((result) => {
        console.log(result.data);
        setQuestion(result.data);
      })
      .catch(() => {
        alert("삭제되었거나 존재하지 않는 게시물 입니다.");
        navigate(-1);
      });
  }, [id]);

  const AuthorBox = styled.div`
  
  `

  const UploadDateBox = styled.div`
    
  `

  return (
    <QuestionBox>
      <QuestionHeaderBox>
        <QuestionTitleBox>{question.title}</QuestionTitleBox>
        <QuestionMetaDataBox>
          <div>{question.author.name}</div>
          <div>hi</div>
        </QuestionMetaDataBox>
      </QuestionHeaderBox>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              style={{
                display: "block",
                margin: "0.5rem auto",
                maxWidth: "80%",
                maxHeight: "auto",
              }}
            />
          ),
        }}
        urlTransform={urlTransform}
      >
        {question && question.body}
      </Markdown>
    </QuestionBox>
  );
};

export default QuestionPage;
