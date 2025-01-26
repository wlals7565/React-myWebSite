import styled from "styled-components";
import { Link } from "react-router";

export const Input = styled.input`
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

export const TextArea = styled.textarea`
  background: none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  color: #fff;
  resize: none;
`;

export const Header = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: white;
`;

export const BlueButton = styled.button`
  display: inline-block;
  background-color: #378ad3;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 10px 10px;
`;

export const BlueButtonLink = styled(Link)`
  display: inline-block;
  background-color: #378ad3;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 10px 10px;
`;

export const Tag = styled.a`
  display: inline-block;
  margin-right: 5px;
  background-color: #3e4a52;
  color: #9cc3db;
  border: 0;
  padding: 7px;
  border-radius: 5px;
  font-size: 0.9rem;
  &:hover {
    background-color: #5e6a72;
    color: #bce3fb;
  }
`;

export const UserLink = styled(Link)`
  color: #3ca4ff;
`;

export const WhoAndWhen = styled.div`
  color: #aaa;
  font-size: 0.8rem;
  float: right;
  padding: 10px 0;
`;

export const CircleButton = styled.button`
border-radius: 50%;
aspect-ratio: 1 / 1;
background-color: inherit;
margin: 0.5rem;
border: 2px solid white;
font-size: 1.5rem;
color: white;
cursor: pointer;
`;

export const PreviewArea = styled.div`
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

export const StyledList = styled.ul`
  li {
    border-top: 1px solid #868e96;
    color: white;
    padding: 1rem 0rem;
    display: flex;
  }

  li:last-child {
    border-bottom: 1px solid #868e96;
  }
`;