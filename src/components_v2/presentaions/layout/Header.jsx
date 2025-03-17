import styled from "styled-components";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { logout } from "../../../api/auth";
import SmallUtilityMenu from "./SmallUtilityMenu";
import MediumUtilityMenu from "./MediumUtilityMenu"
import NavigationBar from "./NavigationBar";


const MastHead = styled.div`
background-color: #d9d9d9;
padding-left: 22.5rem;
display: flex;
align-items: center;
font-size: 1.5rem;
`;

const SmileImage = styled.img`
height: 1.5rem;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("123456");

  const initUser = () => {
    setUser({ email: "", username: "", id: "" });
  };

  const handleClickLogout = () => {
    logout(initUser);
  };

  const hanldeOnChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePressEnterSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput.length === 0) return;
      navigate(`?keyword=${searchInput}`);
      setSearchInput("");
      console.log("press Enter");
    }
  };


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
