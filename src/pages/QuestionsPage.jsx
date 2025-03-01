import styled from "styled-components";
import BlueButtonLink from "../components/BlueButtonLink";
import QuestionsContainer from "../components/containers/QuestionsContainer";
import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/post";
import LoadingCircle from "../components/presentations/LoadingCircle";
import { useSearchParams } from "react-router";
import Pagination from "../components/presentations/Pagination";

// 기본 값 설정
const maxRows = 10;
const maxLink = 5;

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
    <main>
      <HeaderRow>
        <StyledHeader>Top Questions</StyledHeader>
        <BlueButtonLink to={`/ask`}>Ask&nbsp;Question</BlueButtonLink>
      </HeaderRow>
      {questions ? (
        <QuestionsContainer initialState={questions} />
      ) : (
        <LoadingCircle />
      )}
      {totalCount && totalCount > 0 && (
        <Pagination
          maxLink={maxLink}
          totalLink={totalCount}
          createOnClickLinkHandler={createOnClickLinkHandler}
          currentPage={currentPage}
          maxRows={maxRows}
          handleClickNextButton={handleClickNextButton}
          handleClickPrevButton={handleClickPrevButton}
          handleClickFirstButton={handleClickFirstButton}
          handleClickLastButton={handleClickLastButton}
        />
      )}
    </main>
  );
};

export default QuestionsPage;
