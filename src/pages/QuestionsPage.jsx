import styled from "styled-components";
import QuestionRow from "../components/QuestionRow";
import BlueButtonLink from "../components/BlueButtonLink";
import { useState, useEffect } from "react";
import { getAllPost } from "../api/post";
import { useNavigate } from "react-router";

const StyledHeader = styled.h1`
  font-size: 1.6rem;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 30px 20px;
  color: white;
`;

const QuestionsPage = () => {
  const navigate = useNavigate()
  // 게시글 정보
  const [posts, setPosts] = useState([]);
  // 페이지네이션 용 포스트 총 갯수
  const [totalCount, setTotalCount] = useState([]);
  // 쿼리 스트링
  const [params, setParams] = useState({
    limit: 15,
    skip: 0,
  });
  useEffect(() => {
    getAllPost(params).then(({ data }) => {
      console.log(data)
      setPosts(data.posts);
      setTotalCount(data.totalCount);
    });
  }, [params]);

  const HandleClickQuestion = (postId) => {
    navigate(`/questions/${postId}`)
  }

  return (
    <main>
      <HeaderRow>
        <StyledHeader>Top Questions</StyledHeader>
        <BlueButtonLink to={`/ask`}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      {posts && posts.length> 0 &&
        posts.map((post) => (<QuestionRow HandleClickQuestion={HandleClickQuestion} key={post.id} post={post} />))
        }
      <div>{totalCount}</div>
    </main>
  );
};

export default QuestionsPage;
