import PropTypes from "prop-types";
import styled from "styled-components";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useMemo } from "react";

const PaginationButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const LeftArrow = styled(MdKeyboardArrowLeft)`
  display: flex;
  font-size: 1.5rem;
  color: #000000; /* 색상 */
  width: 3rem;
  height: 3rem;
  cursor: pointer; /* 마우스 오버 시 포인터 */
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color:#f0f0f0
  }

  &:active {
    background-color: #E4E4E4;
  }
`;

const LeftDoubleArrow = styled(MdKeyboardDoubleArrowLeft)`
  display: flex;
  font-size: 1.5rem;
  color: #000000; /* 색상 */
  width: 3rem;
  height: 3rem;
  cursor: pointer; /* 마우스 오버 시 포인터 */
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color:#f0f0f0
  }

  &:active {
    background-color: #E4E4E4;
  }
`;

const RightDoubleArrow = styled(MdKeyboardDoubleArrowRight)`
  display: flex;
  font-size: 1.5rem;
  color: #000000; /* 색상 */
  width: 3rem;
  height: 3rem;
  cursor: pointer; /* 마우스 오버 시 포인터 */
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color:#f0f0f0
  }

  &:active {
    background-color: #E4E4E4;
  }
`;

const RightArrow = styled(MdKeyboardArrowRight)`
  display: flex;
  font-size: 1.5rem;
  color: #000000; /* 색상 */
  width: 3rem;
  height: 3rem;
  cursor: pointer; /* 마우스 오버 시 포인터 */
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color:#f0f0f0
  }

  &:active {
    background-color: #E4E4E4;
  }
`;

const NumberLinkButton = styled.button`
  display: flex;
  font-size: 1.5rem;
  background-color: ${(props) =>
    props.$page === props.$currentPage ? "#246BEB" : "#ffffff"};
  display: ${(props) =>
    props.$page <= props.$last && props.$first <= props.$page
      ? "inline-block"
      : "none"};
  color: ${(props) =>
    props.$page === props.$currentPage ? "#ffffff" : "#000000"};    
  border: none;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
    props.$page === props.$currentPage ? "#246BEB" : "#f0f0f0"};
  }

  &:active {
    background-color: ${(props) =>
    props.$page === props.$currentPage ? "#246BEB" : "#E4E4E4"};
  }

`;

const Pagination = ({
  maxLink,
  totalLink,
  createOnClickLinkHandler,
  currentPage,
  maxRows,
  handleClickPrevButton,
  handleClickNextButton,
  handleClickLastButton,
  handleClickFirstButton,
}) => {
  const maxPage = useMemo(
    () => Math.floor((totalLink - 1) / maxRows) + 1,
    [totalLink, maxRows]
  );

  return (
    <PaginationButtonContainer>
      {!(currentPage >= 1 && currentPage <= maxLink) && (
        <LeftDoubleArrow onClick={handleClickFirstButton} />
      )}
      {!(currentPage >= 1 && currentPage <= maxLink) && (
        <LeftArrow onClick={handleClickPrevButton} />
      )}
      {totalLink &&
        totalLink > 0 &&
        Array.from({ length: Math.floor((totalLink - 1) / maxRows) + 1 }).map(
          (_, index) => (
            <NumberLinkButton
              $page={index + 1}
              $currentPage={currentPage}
              key={index}
              onClick={createOnClickLinkHandler(index + 1)}
              $first={Math.floor((currentPage - 1) / maxLink) * maxLink + 1}
              $last={
                Math.floor((currentPage - 1) / maxLink) * maxLink + maxLink
              }
            >
              {index + 1}
            </NumberLinkButton>
          )
        )}
      {!(
        currentPage <= maxPage && maxPage - (maxPage % maxLink) < currentPage
      ) && <RightArrow onClick={handleClickNextButton} />}
      {!(
        currentPage <= maxPage && maxPage - (maxPage % maxLink) < currentPage
      ) && <RightDoubleArrow onClick={handleClickLastButton} />}
    </PaginationButtonContainer>
  );
};

Pagination.propTypes = {
  maxLink: PropTypes.number.isRequired,
  totalLink: PropTypes.number.isRequired,
  createOnClickLinkHandler: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
  handleClickPrevButton: PropTypes.func.isRequired,
  handleClickNextButton: PropTypes.func.isRequired,
  handleClickLastButton: PropTypes.func.isRequired,
  handleClickFirstButton: PropTypes.func.isRequired,
};

export default Pagination;
