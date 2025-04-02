import { useNavigate } from "react-router";
import styled from "styled-components";
import UserContext from "../../../contexts/user/UserContext";
import { logout } from "../../../api/auth";
import { useContext } from "react";
import { ProfileImageURL } from "../../../utilities/common/CONST";

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

const UserProfileIcon = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
  width: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`

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
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogoBox = () => {
    navigate("/");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickRegister = () => {
    navigate("/register");
  };

  // 로그아웃시 저장된 유저 상태 초기화
  const initUser = () => {
    setUser({email: '', username:'', id: ''})
  }

  const handleClickLogout = () => {
    logout(initUser)
  }

  const handleClickMyProfile = () => {
    navigate(`/profiles/${user.username}`)
  }

  console.log(user)


  return (
    <LogoAndUtilityMenuBox>
      <LogoBox onClick={handleClickLogoBox}>
        <Logo src="../../../svg/logo.svg" /> 이정훈의 웹사이트
      </LogoBox>
      <UtilityMenuBox>
        {user.email ? (
          <>
            <MenuBox onClick={handleClickMyProfile}>
              <UserProfileIcon src={`${ProfileImageURL}/${user.username}/${user.image}.png`} />
              계정정보
            </MenuBox>
            <MenuBox onClick={handleClickLogout}>
              <Icon src="../../../svg/logout.svg" />
              로그아웃
            </MenuBox>
          </>
        ) : (
          <>
            <MenuBox onClick={handleClickLogin}>
              <Icon src="../../../svg/login.svg" />
              로그인
            </MenuBox>
            <MenuBox onClick={handleClickRegister}>
              <Icon src="../../../svg/signin.svg" />
              회원가입
            </MenuBox>
          </>
        )}
      </UtilityMenuBox>
    </LogoAndUtilityMenuBox>
  );
};

export default MediumUtilityMenu;
