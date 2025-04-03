// components/Features.js
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 4rem 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
`;

const FeatureText = styled.p`
  color: ${props => props.theme.colors.text.gray};
`;

function Features() {
  const featuresData = [
    {
      icon: '📋',
      title: '게시판',
      description: '다양한 주제에 대해 의견을 나누고 소통할 수 있는 공간입니다. 자유롭게 글을 작성하고 댓글을 통해 소통해보세요.'
    },
    {
      icon: '📅',
      title: '일정 관리',
      description: '곧 추가될 기능입니다. 중요한 일정을 효율적으로 관리하고 알림을 받아보세요.'
    },
    {
      icon: '🔍',
      title: '포트폴리오',
      description: '지금까지 진행한 프로젝트들과 작업물을 확인할 수 있습니다. 다양한 경험과 역량을 살펴보세요.'
    }
  ];

  return (
    <FeaturesSection>
      <FeaturesGrid>
        {featuresData.map((feature, index) => (
          <FeatureCard key={index}>
            <Icon>{feature.icon}</Icon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureText>{feature.description}</FeatureText>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
}

export default Features;