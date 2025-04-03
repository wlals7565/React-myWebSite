import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getAllQuestions } from "../../api/post";
import QuestionList from "../../components_v2/presentaions/questionlist/QuestionList";
import Pagination from "../../components_v2/presentaions/questionlist/Pagination";
import LoadingCircle from "../../components_v2/presentaions/common/LoadingCircle";

// 검색 바
const Bar = styled.div`
  margin: 2rem 6rem 2rem 6rem;
  border: 1px solid #58616a;
  border-radius: 20px;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

// 검색 아이콘
const Search = styled.img`
  height: 2rem;
  width: 2rem;
`;

// 검색 창
const InputBar = styled.input`
  font-size: 1.5rem;
  flex: 1;
  border: none;
  margin: 0 1rem;
  outline: none;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  color: #ffffff;
  background-color: #246beb;
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;

  &:hover {
    background-color: #1D56BC;
  }

  &:active {
    background-color: #16408D;
  }
`;

const maxRows = 10;
const maxLink = 5;

const QuestionListPage = () => {
  const navigate = useNavigate();
  // 질문 목록 저장하는 배열
  const [questionList, setQuestionList] = useState(undefined);
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
  // 검색
  const [search, setSearch] = useState("")

  // 현재 페이지 인덱스
  const [currentPage, setCurrentPage] = useState(1);
  const createOnClickLinkHandler = (number) => {
    const HandleClickLink = () => {
      if (number == currentPage) {
        return;
      }
      setParams((prev) => ({ ...prev, skip: prev.limit * (number - 1) }));
      setCurrentPage(number);
    };
    return HandleClickLink;
  };

  // 페이지네이션 자체 한번 넘기기
  const handleClickNextButton = () => {
    // 마지막 페이지에서는 이유가 없다.
    const maxPage = Math.floor((totalCount - 1) / maxRows) + 1;
    if (currentPage <= maxPage && maxPage - (maxPage % maxLink) < currentPage)
      return;
    const page = (Math.floor((currentPage - 1) / maxLink) + 1) * 5 + 1;
    setParams((prev) => ({ ...prev, skip: prev.limit * (page - 1) }));
    setCurrentPage(page);
  };

  // 페이지네이션 자체 한번 앞으로
  const handleClickPrevButton = () => {
    // 첫 페이지에서는 작동할 이유가 없다.
    if (currentPage >= 1 && currentPage <= maxLink) return;
    const page = Math.floor((currentPage - 1) / maxLink) * 5;
    setParams((prev) => ({ ...prev, skip: prev.limit * (page - 1) }));
    setCurrentPage(page);
  };

  // 페이지네이션 마지막 부분으로
  const handleClickLastButton = () => {
    const lastPage = Math.floor((totalCount - 1) / maxRows) + 1;
    setParams((prev) => ({ ...prev, skip: lastPage }));
    setCurrentPage(lastPage);
  };

  // 페이지네이션 첫번째 부분으로
  const handleClickFirstButton = () => {
    setParams((prev) => ({ ...prev, skip: 0 }));
    setCurrentPage(1);
  };

  // 페이지네이션 검색할 때
  const handlePressEnter = (e) => {
    if(e.key !== 'Enter') return;
    navigate(`/questionList?${search ? 'keyword='+search : ""}`)
  };

  // 처음 접속 및 검색 시 1번째 페이지 로드
  useEffect(() => {
    setCurrentPage(1);

    // params를 업데이트하면서, 최신 값으로 API 호출
    setParams((prev) => {
      const newParams = { ...prev, limit: 10, skip: 0 };

      // params 변경 후 API 호출
      getAllQuestions({ ...newParams, keyword })
        .then(({ data }) => {
          setQuestionList(data.posts);
          setTotalCount(Number(data.totalCount));
        })
        .catch((error) => console.error(error));

      return newParams;
    });
  }, [keyword]);

  // 페이지네이션 페이지 이동시
  useEffect(() => {
    getAllQuestions({ ...params, keyword })
      .then(({ data }) => {
        setQuestionList(data.posts);
        setTotalCount(Number(data.totalCount));
      })
      .catch((error) => console.error(error));
  }, [params]);

  const handleClickWritePostButton = () => {
    navigate('/WriteQuestion')
  }

  return (
    // questionList가 없을 때 로딩 표시
    !questionList? (
      <LoadingCircle />
    ) : (
      <>
        <Bar>
          <Search src="../../../svg/search.svg" />
          <InputBar spellCheck={false} onKeyDown={handlePressEnter} onChange={(e)=> setSearch(e.target.value)} value={search} placeholder="검색어를 입력해주세요." maxLength={300} />
        </Bar>
        <ButtonBox>
          <Button onClick={handleClickWritePostButton}>글쓰기</Button>
        </ButtonBox>
        <QuestionList questionList={questionList} />
        {totalCount > 0 && (
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
      </>
    )
  );
};

export default QuestionListPage;
