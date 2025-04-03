import styled from 'styled-components';

const CTASection = styled.section`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: 4rem 0;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  width: 90%;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CTAText = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const CTAButton = styled.a`
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
`;

function CallToAction() {
  return (
    <CTASection>
      <CTAContent>
        <CTATitle>함께 성장해요</CTATitle>
        <CTAText>질문이나 의견이 있으시면 게시판에 남겨주세요. 항상 소통하고 발전하는 공간이 되도록 노력하겠습니다.</CTAText>
        <CTAButton href="#">게시판으로 이동</CTAButton>
      </CTAContent>
    </CTASection>
  );
}

export default CallToAction;
