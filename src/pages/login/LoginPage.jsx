import styled from "styled-components";
import { useCallback, useContext, useState } from "react";
import UserContext from "../../contexts/user/UserContext";
import { login } from "../../api/auth";
import { useNavigate } from "react-router";

const Label = styled.div`
  font-size: 1rem;
  text-align: left;
  margin-bottom: 0.2rem;
  font-weight: bold;
`;

const Input = styled.input`
  height: 2rem;
  border-radius: 10px;
  font-size: 1.2rem;

  &:focus {
    outline-color: #2768ff;
  }
`;



const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid #8e8e8e;
  width: 50vw;
  margin: 1rem auto;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
  width: 25vw;
`;

const LoginButton = styled.button`
  border-radius: 10px;
  width: 25vw;
  background-color: #2768ff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  color: white;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  cursor: pointer;

  &:hover {
    background-color: #1F53CC;
  }

  &:active {
    background-color: #173E99;
  }
`;

const LoginMenuBox = styled.div`
  width: 25vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LoginMenu = styled.div`
  flex: 1;
  text-align: center;
`;

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = useCallback((e) => {
      setFormData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }, []);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const goHome = () => {
      navigate("/");
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        login(setUser, formData, goHome, setErrorMessage);
      };

  return (
    <LoginBox>
      <InputBox>
        <Label>아이디</Label>
        <Input onChange={handleFormChange} type="email" name="email" value={formData.email}></Input>
      </InputBox>
      <InputBox>
        <Label>비밀번호</Label>
        <Input onChange={handleFormChange} type="password" name="password" value={formData.password}></Input>
      </InputBox>
      <LoginButton onClick={handleSubmitLogin}>로그인하기</LoginButton>
      <LoginMenuBox>
        <LoginMenu>아이디 찾기</LoginMenu>
        <LoginMenu>비밀번호 찾기</LoginMenu>
        <LoginMenu>회원가입</LoginMenu>
      </LoginMenuBox>
    </LoginBox>
  );
};

export default LoginPage;
