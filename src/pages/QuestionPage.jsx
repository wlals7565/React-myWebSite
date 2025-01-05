import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPost } from "../api/post";

const Container = styled.div`
  padding: 30px 20px;
`;

const BodyArea = styled.div`
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

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: white;
`;
// 제목, 본문, 댓글, 댓글 다는 폼 형식
const QuestionPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", body: "" });

  useEffect(() => {
    getPost(id).then((result) => setPost(result.data))
  }, [id]);

  return (
    <Container>
      <StyledHeader>{post.title}</StyledHeader>
      <BodyArea>
        <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
      </BodyArea>
    </Container>
  );
};

export default QuestionPage;
