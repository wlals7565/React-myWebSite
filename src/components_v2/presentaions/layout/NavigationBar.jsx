import styled from "styled-components";
import LayoutContext from "../../../contexts/layout/LayoutContext";
import { useNavigate } from "react-router";
import { useContext } from "react";

const Bar = styled.div`
  margin-top: 2rem;
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
`;

const MenuBar = styled.div`
  margin: 0 22.5rem;
  background-color: white;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  cursor: pointer;
  color: #555555;
  position: relative;
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  margin: 0 1rem; /* 메뉴 간 간격 추가 */
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    text-decoration-color: black;
  }
`;

const NavigationBar = () => {
  
  const navigate = useNavigate();

  const handleClickCalendarMenu = () => {
    navigate('/calendar');
  }

  const handleClickQuestionsMenu = () => {
    navigate('/questions')
  }

  return (
    <Bar>
      <MenuBar>
        <Menu onClick={handleClickQuestionsMenu} style={{color: '#246BEB'}}>질문 게시판</Menu>
        <Menu onClick= {handleClickCalendarMenu}>일정 관리</Menu>
        <Menu>실시간 채팅 질문</Menu>
        <Menu>태그 검색</Menu>
      </MenuBar>
    </Bar>
  );
};

export default NavigationBar;
