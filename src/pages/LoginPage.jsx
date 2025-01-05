import BlueButton from "../components/BlueButton";
import { Header, Input } from "../components/StyledComponents";
import styled from "styled-components";
import { useCallback, useContext, useState } from "react";
import { login } from "../api/auth";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router";
import ErrorBox from "../components/ErrorBox";

const Container = styled.div`
  padding: 30px 20px;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const goHome = () => {
    navigate("/");
  };
  const handleFormChange = useCallback((e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }, []);
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    login(setUser, formData, goHome, setErrorMessage);
  };

  return (
    <Container>
      <Header> Login </Header>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <form onSubmit={handleSubmitLogin}>
        <Input
          placeholder={`email`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
        />
        <Input
          placeholder={"password"}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <BlueButton type="submit">Login</BlueButton>
      </form>
    </Container>
  );
};

export default LoginPage;
