import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router";
import Layout from "./components_v2/presentaions/Layout";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/v2/HomePage";
import QuestionsPage from "./pages/v2/QuestionsPage";
import ChatPage from "./pages/v2/ChatPage";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    font-size: 16px;
    background-color: #ffffff;
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
  const [user, setUser] = useState({ email: "", username: "", id: "" });

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/Questions" element={<QuestionsPage />} />
            <Route path="/Chat" element={<ChatPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
