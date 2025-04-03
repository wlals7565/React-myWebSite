import { useNavigate } from 'react-router';
import styled from 'styled-components';

const HeroBox = styled.section`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(52, 152, 219, 0.7), rgba(231, 76, 60, 0.5));
  }
`;

const HeroContentBox = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  width: 90%;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.7rem 2rem;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-weight: bold;
  
  &:hover {
    background-color: #c0392b;
  }
  
  ${props => props.$outline && `
    background-color: transparent;
    border: 2px solid ${props.theme.colors.white};
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `}
`;

function Hero() {
  const navigate = useNavigate();

  const ClickGoToQuestionList = () => {
    navigate('/QuestionList')
  }

  const ClickGoToAbout = () => {
    navigate("/about")
  }

  return (
    <HeroBox>
      <HeroContentBox>
        <HeroTitle>안녕하세요, 제 포트폴리오에 오신 것을 환영합니다</HeroTitle>
        <HeroText>창의적인 프로젝트와 소통을 위한 공간입니다. 게시판을 통해 소통하고, 일정 관리 기능으로 효율적인 시간 관리를 경험해보세요.</HeroText>
        <ButtonContainer>
          <Button onClick={ClickGoToQuestionList}>게시판 바로가기</Button>
          <Button onClick={ClickGoToAbout} $outline={true}>더 알아보기</Button>
        </ButtonContainer>
      </HeroContentBox>
    </HeroBox>
  );
}

export default Hero;