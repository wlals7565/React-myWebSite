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
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
