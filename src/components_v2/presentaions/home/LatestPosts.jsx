import styled from 'styled-components';

const PostsSection = styled.section`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  
  &::after {
    content: '';
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.colors.primary};
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PostCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 1.5rem;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostDate = styled.div`
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const PostExcerpt = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const ReadMore = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

function LatestPosts() {
  const postsData = [
    {
      date: '2025년 4월 3일',
      title: '웹사이트 오픈 안내',
      excerpt: '포트폴리오 웹사이트를 오픈했습니다. 앞으로 다양한 기능이 추가될 예정이니 많은 관심 부탁드립니다.'
    },
    {
      date: '2025년 4월 2일',
      title: '일정 관리 기능 개발 중',
      excerpt: '곧 추가될 일정 관리 기능에 대한 개발 진행 상황을 공유합니다. 많은 기대 부탁드립니다.'
    },
    {
      date: '2025년 4월 1일',
      title: '포트폴리오 업데이트',
      excerpt: '최근 진행한 프로젝트들이 포트폴리오 섹션에 업데이트되었습니다. 확인해보세요.'
    }
  ];

  return (
    <PostsSection>
      <SectionTitle>최근 게시글</SectionTitle>
      <PostsGrid>
        {postsData.map((post, index) => (
          <PostCard key={index}>
            <PostImage>이미지 준비중</PostImage>
            <PostContent>
              <PostDate>{post.date}</PostDate>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <ReadMore href="#">더 읽기</ReadMore>
            </PostContent>
          </PostCard>
        ))}
      </PostsGrid>
    </PostsSection>
  );
}

export default LatestPosts;