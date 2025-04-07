import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getAllQuestions } from "../../api/post";
import QuestionList from "../../components_v2/presentaions/questionlist/QuestionList";
import Pagination from "../../components_v2/presentaions/questionlist/Pagination";
import LoadingCircle from "../../components_v2/presentaions/common/LoadingCircle";

// 검색 박스
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

// 검색 바
const SearchBar = styled.div`
  width: 80%;
  margin: 2rem 1rem;
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
  justify-content: space-between;
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
    background-color: #1d56bc;
  }

  &:active {
    background-color: #16408d;
  }
`;

const Selector = styled.select`
  border: 2px solid #ddd;
  background: #ffffff;
  padding: 10px;
  transition: 0.4s;
  border-radius: 10px;
`;

const maxRows = 10;
const maxLink = 5;

const QuestionListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  // 상태 관리
  const [questionList, setQuestionList] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(keyword || "");
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [searchOption, setSearchOption] = useState("키워드");

  // 데이터 가져오기 함수
  const fetchQuestions = useCallback(
    async (page, searchKeyword, searchSortOption) => {
      setLoading(true);
      try {
        const skip = (page - 1) * maxRows;
        const { data } = await getAllQuestions({
          limit: maxRows,
          skip,
          keyword: searchKeyword,
          sort: searchSortOption,
        });

        setQuestionList(data.posts);
        setTotalCount(Number(data.totalCount));
      } catch (error) {
        console.error("질문 목록을 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 검색어 변경 및 정렬 방법 변경 시 데이터 다시 가져오기
  useEffect(() => {
    setCurrentPage(1);
    fetchQuestions(1, keyword, sortOption);
  }, [keyword, fetchQuestions, sortOption]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (newPage) => {
      setCurrentPage(newPage);
      fetchQuestions(newPage, keyword, sortOption);
    },
    [fetchQuestions, keyword, sortOption]
  );

  // 페이지네이션 링크 핸들러
  const createOnClickLinkHandler = useCallback(
    (number) => {
      return () => {
        if (number === currentPage) return;
        handlePageChange(number);
      };
    },
    [currentPage, handlePageChange]
  );

  // 페이지네이션 네비게이션 핸들러
  const handleClickNextButton = useCallback(() => {
    const maxPage = Math.floor((totalCount - 1) / maxRows) + 1;
    if (currentPage <= maxPage && maxPage - (maxPage % maxLink) < currentPage)
      return;

    const page = (Math.floor((currentPage - 1) / maxLink) + 1) * 5 + 1;
    handlePageChange(page);
  }, [currentPage, totalCount, handlePageChange]);

  const handleClickPrevButton = useCallback(() => {
    if (currentPage >= 1 && currentPage <= maxLink) return;

    const page = Math.floor((currentPage - 1) / maxLink) * 5;
    handlePageChange(page);
  }, [currentPage, handlePageChange]);

  const handleClickLastButton = useCallback(() => {
    const lastPage = Math.floor((totalCount - 1) / maxRows) + 1;
    handlePageChange(lastPage);
  }, [totalCount, handlePageChange]);

  const handleClickFirstButton = useCallback(() => {
    handlePageChange(1);
  }, [handlePageChange]);

  // 검색 핸들러
  const handlePressEnter = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      navigate(`/questionList?${search ? "keyword=" + search : ""}`);
    },
    [navigate, search]
  );

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // 글쓰기 버튼 핸들러
  const handleClickWritePostButton = useCallback(() => {
    navigate("/WriteQuestion");
  }, [navigate]);

  // 로딩 중이거나 데이터가 없을 때 로딩 컴포넌트 표시
  if (loading || !questionList) {
    return <LoadingCircle />;
  }

  // 정렬 방식 변경
  const handleChangeSortOption = (e) => {
    e.preventDefault();
    setSortOption(e.target.value);
  };

  // 검색 방식 변경
  const handleChangeSearchOption = (e) => {
    e.preventDefault();
    setSearchOption(e.target.value);
  };

  return (
    <>
      <SearchBox>
        {/* 일단 보류
        <Selector value={searchOption} onChange={handleChangeSearchOption}>
          <option value="키워드">키워드</option>
          <option value="태그">태그</option>
        </Selector>
        */}
        <SearchBar>
          <Search src="../../../svg/search.svg" />
          <InputBar
            spellCheck={false}
            onKeyDown={handlePressEnter}
            onChange={handleSearchChange}
            value={search}
            placeholder="검색어를 입력해주세요."
            maxLength={300}
          />
        </SearchBar>
      </SearchBox>
      <ButtonBox>
        <Selector value={sortOption} onChange={handleChangeSortOption}>
          <option value="newest">최신 게시글 순</option>
          <option value="oldest">오래된 게시글 순</option>
          <option value="like">좋아요 많은 순</option>
          <option value="view">조회수 많은 순</option>
          <option value="comment">댓글 많은 순</option>
        </Selector>
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
  );
};

export default QuestionListPage;
