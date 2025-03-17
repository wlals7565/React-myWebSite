import styled from "styled-components";
import { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router";

const RegisterBox = styled.div`
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

const ErrorBox = styled.div`
  color: red;
  margin-bottom: 20px;
  font-weight: bold;
  width: 25vw;
  margin-top: 0.5rem;
  height: 2rem;
`;

const RegisterButton = styled.button`
  border-radius: 10px;
  width: 25vw;
  background-color: #2768ff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  color: white;
  padding: 0.5rem 0;
  margin-bottom: 2rem;

  &:hover {
    background-color: #1f53cc;
  }

  &:active {
    background-color: #173e99;
  }
`;

// # TODO: 중복검사
const VALIDATION_RULES = {
  name: {
    regex: /^[A-Za-z0-9]{2,50}$/,
    errorMessage:
      "닉네임은 최소 2자 최대 50자까지 가능하며 영어 대문자, 영어 소문자, 숫자만을 허용합니다.",
  },
  email: {
    regex: /^(?=.{3,254}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    errorMessage:
      "이메일은 최소 3자에서 최대 254자까지 가능하며 이메일 형식을 지켜야합니다.",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,64}$/,
    errorMessage:
      "비밀번호는 최소8자 최대 64자까지 가능하며 특수문자, 숫자, 영어 대문자, 영어 소문자만을 허용합니다. 또한 최소 한 개의 특수문자와 한 개의 숫자를 포함해야 합니다.",
  },
  passwordConfirm: {
    validate: (value, form) => value === form.password,
    errorMessage: "비밀번호와 비밀번호 재입력 값이 일치하지 않습니다.",
  },
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setFrom] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangeForm = (e) => {
    setFrom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hanldeBlurFrom = (e) => {
    validateForm(e.target.name);
  };

  const validateField = (field, value) => {
    const rule = VALIDATION_RULES[field];
    if (!rule) return ""; // 규칙이 없으면 에러 없음
    // 정규표현식 검증이 존재할 경우
    if (rule.regex) {
      return rule.regex.test(value) ? "" : rule.errorMessage;
    }
    // 값 검증이 존재할 경우
    if (rule.validate) {
      return rule.validate(value, form) ? "" : rule.errorMessage;
    }
    // 기존회원이 존재할 경우
    return "";
  };

  const validateForm = (target = "all") => {
    const fieldsToValidate =
      target === "all" ? Object.keys(VALIDATION_RULES) : [target];
    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
      else newErrors[field] = "";
    });
    setError((prev) => ({ ...prev, ...newErrors }));
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    validateForm();
    for (let err in error) {
      if (error[err] !== "") {
        return;
      }
    }
    register(form, goHome);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <RegisterBox>
      <form onSubmit={handleSubmitRegister}>
        <InputBox>
          <Label>닉네임</Label>
          <Input
            placeholder={`nickname`}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChangeForm}
            onBlur={hanldeBlurFrom}
          />
          <ErrorBox>{error.name}</ErrorBox>
        </InputBox>

        <InputBox>
          <Label>이메일</Label>
          <Input
            placeholder={`email`}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChangeForm}
            onBlur={hanldeBlurFrom}
          />
          <ErrorBox>{error.email}</ErrorBox>
        </InputBox>
        <InputBox>
          <Label>비밀번호</Label>
          <Input
            placeholder={"password"}
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChangeForm}
            onBlur={hanldeBlurFrom}
          />
          <ErrorBox>{error.password}</ErrorBox>
        </InputBox>
        <InputBox>
          <Label>비밀번호 확인</Label>
          <Input
            placeholder={`passwordConfirm`}
            type="password"
            name="passwordConfirm"
            autoComplete="new-password"
            value={form.passwordConfirm}
            onChange={handleChangeForm}
            onBlur={hanldeBlurFrom}
          />
          <ErrorBox>{error.passwordConfirm}</ErrorBox>
        </InputBox>

        <RegisterButton type="submit">회원가입</RegisterButton>
      </form>
    </RegisterBox>
  );
};

export default RegisterPage;

/*
        <ErrorDiv>{error.name}</ErrorDiv>
        <ErrorDiv>{error.email}</ErrorDiv>
        <ErrorDiv>{error.password}</ErrorDiv>
        <ErrorDiv>{error.passwordConfirm}</ErrorDiv>
*/
