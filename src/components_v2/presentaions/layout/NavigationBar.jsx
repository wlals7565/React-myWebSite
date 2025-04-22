import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";

const Bar = styled.div`
  margin-top: 2rem;
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
`;

const MenuBar = styled.div`
  margin: 0 22.5vw;
  background-color: white;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  cursor: pointer;
  color: ${({ $isCurrent }) => ($isCurrent ? "#246BEB" : "#555555")};
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

const navigations = [
  { path: "/questionList", title: "질문 게시판" },
  { path: "/chat", title: "실시간 채팅" },
  //{ path: "/calendar", title: "일정 관리" },
  //{ path: "emailBuilder", title: "이메일 빌더"},
  { path: "/play", title: "심심풀이용" },
];

const NavigationBar = () => {
  const navigate = useNavigate();
  
  // 현재 위치하는 페이지
  const [current, setCurrent] = useState(undefined);


  const createNavigateHandler = (path, i) => {
    return () => {
      setCurrent(i);
      navigate(path);
    };
  };

  return (
    <Bar>
      <MenuBar>
        {navigations.map((navigation, i) => (
          <Menu key={i}  $isCurrent={i === current} onClick={createNavigateHandler(navigation.path, i)}>
            {navigation.title}
          </Menu>
        ))}
      </MenuBar>
    </Bar>
  );
};

export default NavigationBar;
