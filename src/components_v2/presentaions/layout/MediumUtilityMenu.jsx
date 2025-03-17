import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const LogoAndUtilityMenuBox = styled.div`
  margin: 1rem 22.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 2rem;
`;

const Icon = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const UtilityMenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  font-size: 1.5rem;
  white-space: nowrap;
  cursor: pointer;
`;

const MediumUtilityMenu = () => {
  const navigate = useNavigate()

  const handleClickLogoBox = () => {
    navigate('/')
  }

  const handleClickLogin = () => {
    navigate('/login');
  }

  const handleClickRegister = () => {
    navigate('/register');
  }

  return (
    <LogoAndUtilityMenuBox>
      <LogoBox onClick={handleClickLogoBox}>
        <Logo src="../../../svg/logo.svg" /> 이정훈의 질문 게시판
      </LogoBox>
      <UtilityMenuBox>
        <MenuBox onClick={handleClickLogin}>
          <Icon src="../../../svg/login.svg" />
          로그인
        </MenuBox>
        <MenuBox onClick={handleClickRegister}>
          <Icon src="../../../svg/signin.svg" />
          회원가입
        </MenuBox>
      </UtilityMenuBox>
    </LogoAndUtilityMenuBox>
  );
};

export default MediumUtilityMenu;
