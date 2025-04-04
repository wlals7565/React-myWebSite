import styled from "styled-components";

const FooterBox = styled.div`
  background-color: #d9d9d9;
  padding-left: 12.5vw;
  font-size: 1.5rem;
`;

const LogoBox = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  height: 2rem;
`;

const Footer = () => {
  return (
    <footer>
      <FooterBox>
      <LogoBox>
        <Logo src="../../../svg/logo.svg" /> 이정훈의 웹사이트
      </LogoBox>
        <nav>
          <ul>
            <li>웹 제작자: 이정훈</li>
            <li>전화번호: 010-8563-5826</li>
            <li>&copy; 2025 이정훈의 웹사이트. All rights reserved.</li>
          </ul>
        </nav>
      </FooterBox>
    </footer>
  );
};

export default Footer;
