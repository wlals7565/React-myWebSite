import React from "react";
import styled from "styled-components";

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
  return (
    <Bar>
      <MenuBar>
        <Menu style={{color: '#246BEB'}}>질문 게시판</Menu>
        <Menu>실시간 채팅 질문</Menu>
        <Menu>태그 검색</Menu>
      </MenuBar>
    </Bar>
  );
};

export default NavigationBar;
