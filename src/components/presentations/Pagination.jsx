import PropTypes from "prop-types";
import styled from "styled-components";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useMemo } from "react";

const PaginationButtonContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const LeftArrow = styled(MdKeyboardArrowLeft)`
  color: white; /* 색상 */
  cursor: pointer; /* 마우스 오버 시 포인터 */
`;

const LeftDoubleArrow = styled(MdKeyboardDoubleArrowLeft)`
  color: white; /* 색상 */
  cursor: pointer; /* 마우스 오버 시 포인터 */
`;

const RightDoubleArrow = styled(MdKeyboardDoubleArrowRight)`
  color: white;
  cursor: pointer;
`;

const RightArrow = styled(MdKeyboardArrowRight)`
  color: white; /* 색상 */
  cursor: pointer; /* 마우스 오버 시 포인터 */
`;

const NumberLinkButton = styled.button`
  background-color: ${(props) =>
    props.$page === props.$currentPage ? "blue" : "gray"};
  display: ${(props) =>
    props.$page <= props.$last && props.$first <= props.$page
      ? "inline-block"
      : "none"};
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
  handleClickFirstButton
}) => {
  const maxPage = useMemo(() => Math.floor((totalLink-1)/maxRows)+1, [totalLink, maxRows])

  return (
    <PaginationButtonContainer>
      {!(currentPage >=1 && currentPage <= maxLink)  && < LeftDoubleArrow onClick={handleClickFirstButton} />}
      {!(currentPage >=1 && currentPage <= maxLink)  && <LeftArrow onClick={handleClickPrevButton}/>}
      {totalLink &&
        totalLink > 0 &&
        Array.from({ length: Math.floor((totalLink-1)/maxRows)+1 }).map((_, index) => (
          <NumberLinkButton
            $page={index + 1}
            $currentPage={currentPage}
            key={index}
            onClick={createOnClickLinkHandler(index + 1)}
            $first={Math.floor((currentPage - 1) / maxLink) * maxLink + 1}
            $last={Math.floor((currentPage - 1) / maxLink) * maxLink + maxLink}
          >
            {index + 1}
          </NumberLinkButton>
        ))}
      {!(currentPage <= maxPage && maxPage-maxPage%maxLink < currentPage) && <RightArrow onClick={handleClickNextButton}/>}
      {!(currentPage <= maxPage && maxPage-maxPage%maxLink < currentPage)&&<RightDoubleArrow onClick={handleClickLastButton} />}
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
