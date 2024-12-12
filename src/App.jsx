import reset from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import QuestionPage from "./pages/QuestionPage";
import { Route, Routes } from "react-router";
import AskPage from "./pages/AskPage";
import Layout from "./components/Layout";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color: #2d2d2d;
    font-family: "Roboto Serif", serif;
  }

  a {
    color: inherit; /* 부모 요소의 색상 계승 */
    text-decoration: none; /* 밑줄 제거 */
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<QuestionPage />} />
          <Route path="/ask" element={<AskPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
