import styled from "styled-components";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/user/UserContext";
import { logout } from "../../../api/auth";
import SmallUtilityMenu from "./SmallUtilityMenu";
import MediumUtilityMenu from "./MediumUtilityMenu"
import NavigationBar from "./NavigationBar";


const MastHead = styled.div`
background-color: #d9d9d9;
padding: 0 22.5rem;
display: flex;
align-items: center;
font-size: 1.5rem;
white-space: nowrap;
`;

const SmileImage = styled.img`
height: 1.5rem;
`;

const Header = () => {

  return (
    <header>
      <MastHead>
        {" "}
        <SmileImage src="../../../svg/smile.svg" />
        안녕하세요. 이정훈의 웹 사이트입니다.
      </MastHead>
      <SmallUtilityMenu />
      <MediumUtilityMenu />
      <NavigationBar />
    </header>
  );
};

export default Header;
