import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { logout } from "../api/auth";

const StyledHeader = styled.header`
  background-color: #393939;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 240px 4fr 1fr;
  grid-column-gap: 20px;
`;

const SpaceAroundDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: inline-block;
  height: 50px;
  line-height: 30px;
  padding: 10px 15px;
  svg {
    margin-top: 10px;
    float: left;
    font-weight: 300;
  }
  b {
    font-weight: normal;
    display: inline-block;
    margin-left: 2px;
  }
  span {
    display: inline-block;
    padding-left: 5px;
    padding-top: 15px;
    font-size: 1.2rem;
  }
`;

const SearchInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #777;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  margin-top: 17px;
  color: white;
`;

const HeaderLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  line-height: 70px;
  padding: 0 20px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("123456")

  const initUser = () => {
    setUser({email: '', username:'', id: ''})
  }

  const handleClickLogout = () => {
    logout(initUser)
  }

  const hanldeOnChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handlePressEnterSearch = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      if( searchInput.length === 0) return;
      navigate(`?keyword=${searchInput}`)
      setSearchInput("")
      console.log('press Enter')
    }
  }
  

  return (
    <StyledHeader>
      <LogoLink to={"/"} className="logo">
        <FontAwesomeIcon icon={faStackOverflow} size="2x" />
        <span>
          stack <b>UnderFlow</b>
        </span>
      </LogoLink>
      <form action="" className="search">
        <SearchInput id={"searchInput"} type="text" placeholder="Search..." value={searchInput} onChange={hanldeOnChangeSearchInput} onKeyDown={handlePressEnterSearch} />
      </form>
      {user.username ? (
        <SpaceAroundDiv>
          <HeaderLink to={`/profiles/${user.username}`} className="profile">
            {user.email}
          </HeaderLink>
          <HeaderLink onClick={handleClickLogout}>{"Logout"}</HeaderLink>
        </SpaceAroundDiv>
      ) : (
        <SpaceAroundDiv>
          <HeaderLink to={`/login`} className="login">
            {`Login`}
          </HeaderLink>
          <HeaderLink to={`/register`} className="register">
            {`Register`}
          </HeaderLink>
        </SpaceAroundDiv>
      )}
    </StyledHeader>
  );
};

export default Header;
