import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router";

const StyledHeader = styled.header`
  background-color: #393939;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 240px 1fr 200px;
  grid-column-gap: 20px;
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
  background: rgba(0,0,0,.1);
  padding: 10px 10px;
  margin-top: 17px;
`

const ProfileLink = styled.a`
  color:#fff;
  text-decoration: none;
  line-height: 70px;
`

const Header = () => {
  return (
    <StyledHeader>
      <LogoLink to={'/'} className="logo">
        <FontAwesomeIcon icon={faStackOverflow} size="2x" />
        <span>stack <b>UnderFlow</b></span>
      </LogoLink>
      <form action="" className="search">
        <SearchInput type="text" placeholder="Search..." />
      </form>
      <ProfileLink href="" className="profile">
        IJH
      </ProfileLink>
    </StyledHeader>
  );
};

export default Header;
