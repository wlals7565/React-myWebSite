import reset from "styled-reset";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router";
import Layout from "./components_v2/presentaions/layout/Layout";
import { useState, useEffect } from "react";
import UserContext from "./contexts/user/UserContext";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/home/HomePage";
import QuestionListPage from "./pages/questionlist/QuestionListPage";
import ChatPage from "./pages/chat/ChatPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import TestPage from "./pages/test/TestPage";
import LoginPage from "./pages/login/LoginPage";
import LayoutContext from "./contexts/layout/LayoutContext";
import RegisterPage from "./pages/register/RegisterPage";
import { checkAuthStatus } from "./api/auth";
import WriteQuestionPage from "./pages/writequestion/WriteQuestionPage";
import PlayPage from "./pages/play/PlayPage";
import QuestionPage from "./pages/question/QuestionPage";
import ProfilePages from "./pages/profile/ProfilePages";
import AboutPage from "./pages/about/AboutPage";
import { ToastContainer } from "react-toastify";

// 테마 설정
const theme = {
  colors: {
    primary: "#3498db",
    secondary: "#2c3e50",
    light: "#ecf0f1",
    dark: "#34495e",
    accent: "#e74c3c",
    background: "#f9f9f9",
    white: "#ffffff",
    text: {
      dark: "#2c3e50",
      light: "#ffffff",
      muted: "#999999",
      gray: "#666666",
    },
  },
  breakpoints: {
    mobile: "768px",
  },
};

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

  // 처음 페이지 들어왔을 때 로그인 여부 확인
  useEffect(() => {
    const syncCheckAuthStatus = async () => {
      await checkAuthStatus(setUser);
    };
    syncCheckAuthStatus();
  }, [setUser]);
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserContext.Provider value={{ user, setUser }}>
          <LayoutContext.Provider value={{ layout, setLayout }}>
            <Routes>
              <Route path="/WriteQuestion" element={<WriteQuestionPage />} />
              <Route element={<Layout layout={layout} />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/QuestionList" element={<QuestionListPage />} />
                <Route path="/Questions/:id" element={<QuestionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/Profiles/:username" element={<ProfilePages />} />
                <Route path="/Chat" element={<ChatPage />} />
                <Route path="/Calendar" element={<CalendarPage />} />
                <Route path="/play" element={<PlayPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </LayoutContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
