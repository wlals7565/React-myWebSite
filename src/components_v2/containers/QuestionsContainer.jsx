import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getAllQuestions } from "../../api/post";
import QuestionList from "../presentaions/QuestionList";
import PropTypes from "prop-types";

const QuestionsContainer = () => {
  const [questions, setQuestions] = useState([]);
  // 페이지네이션 용 포스트 총 갯수
  const [totalCount, setTotalCount] = useState(0);
  // 쿼리 스트링
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  // API 요청 옵션
  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const createOnClickLinkHandler = (number) => {
    const HandleClickLink = () => {
      setParams((prev) => ({ ...prev, skip: prev.limit * (number - 1) }));
      setCurrentPage(number);
    };
    return HandleClickLink;
  };

  const handleClickNextButton = () => {
    // 마지막 페이지에서는 이유가 없다.
    const maxPage = Math.floor((totalCount - 1) / maxRows) + 1;
    if (currentPage <= maxPage && maxPage - (maxPage % maxLink) < currentPage)
      return console.log("next");
    const page = (Math.floor((currentPage - 1) / maxLink) + 1) * 5 + 1;
    console.log(page);
    setParams((prev) => ({ ...prev, skip: prev.limit * (page - 1) }));
    setCurrentPage(page);
  };

  const handleClickPrevButton = () => {
    // 첫 페이지에서는 작동할 이유가 없다.
    if (currentPage >= 1 && currentPage <= maxLink) return console.log("prev");
    const page = (Math.floor((currentPage - 1) / maxLink) - 1) * 5 + 1;
    console.log(page);
    setParams((prev) => ({ ...prev, skip: prev.limit * (page - 1) }));
    setCurrentPage(page);
  };

  const handleClickLastButton = () => {
    const lastPage = Math.floor((totalCount - 1) / maxRows) + 1;
    setParams((prev) => ({ ...prev, skip: lastPage }));
    setCurrentPage(lastPage);
  };

  const handleClickFirstButton = () => {
    setParams((prev) => ({ ...prev, skip: 0 }));
    setCurrentPage(1);
  };

  const handlePressEnterOnPageInput = () => {};

  useEffect(() => {
    getAllQuestions({ ...params, keyword })
      .then(({ data }) => {
        setQuestions(data.posts);
        setTotalCount(Number(data.totalCount));
      })
      .catch((error) => console.log(error));
  }, [params, keyword]);

  useEffect(() => {
    setCurrentPage(1);
    setParams({ limit: 10, skip: 0 });
  }, [keyword]);

  return (
    <QuestionList questions={questions}/>
  )
};

QuestionsContainer.propTypes = {
  initialState: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      views: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      deletedAt: PropTypes.string,
      author: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
      }),
      votes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        state: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      })),
      answerCount: PropTypes.number.isRequired,
  }))
}

export default QuestionsContainer;
