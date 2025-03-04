import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import QuestionsPage from "./pages/QuestionsPage";
import { Route, Routes } from "react-router";
import AskPage from "./pages/AskPage";
import Layout from "./components/Layout";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    font-size: 16px;
    background-color: #2d2d2d;
    font-family: "Pretendard GOV Variable", "Pretendard GOV", -apple-system, BlinkMacSystemFont, system-ui, 
                 Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", 
                 "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", 
                 "Segoe UI Symbol", sans-serif !important;
  }

  a {
    color: inherit; /* 부모 요소의 색상 계승 */
    text-decoration: none; /* 밑줄 제거 */
  }
`;

function App() {
  const [user, setUser] = useState({email: '', username:'', id: ''});


  return (
    <div>
      <GlobalStyle />
      <UserContext.Provider value={{user, setUser}} >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<QuestionsPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/profiles/:username" element={<ProfilePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
