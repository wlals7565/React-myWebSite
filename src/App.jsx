import reset, { Reset } from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import QuestionPage from "./pages/QuestionPage";

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
      <Reset />
      <GlobalStyle />
      <Header />
      <QuestionPage />
    </div>
  );
}

export default App;
