import { useState, useEffect } from "react";
import { getAllPost } from "../../api/post";
import QuestionList from "../presentations/QuestionList";

const QuestionsContainer = () => {
  // 게시글 정보
  const [questions, setQuestions] = useState([]);
  // 페이지네이션 용 포스트 총 갯수
  const [totalCount, setTotalCount] = useState([]);
  // 쿼리 스트링
  const [params, setParams] = useState({
    limit: 15,
    skip: 0,
  });
  useEffect(() => {
    getAllPost(params).then(({ data }) => {
      setQuestions(data.posts);
      setTotalCount(data.totalCount);
    });
  }, [params]);

  

  return (
    <>
      <QuestionList questions={questions}/>
      <div>{totalCount}</div>
      <div>리팩토링 했다는 표시 그리고 테스트용겸</div>
    </>
  )
}

export default QuestionsContainer