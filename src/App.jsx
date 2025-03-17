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
import CalendarPage from "./pages/Calendar/CalendarPage";
import TestPage from "./pages/test/TestPage";
import LoginPage from "./pages/login/LoginPage";
import LayoutContext from "./contexts/layout/LayoutContext";
import RegisterPage from "./pages/register/RegisterPage";

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
  // 유저 정보 담는 객체
  const [user, setUser] = useState({ email: "", username: "", id: "" });

  // center 중간에 모으기 마진 양쪽 22.5rem, wide 전체 화면 마진 양쪽 0rem
  const [layout, setLayout] = useState("center");
  return (
    <div>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <LayoutContext.Provider value={{ layout, setLayout }}>
          <Routes>
            <Route element={<Layout layout={layout} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Questions" element={<QuestionsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/Chat" element={<ChatPage />} />
              <Route path="/Calendar" element={<CalendarPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </LayoutContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
