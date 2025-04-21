import PropTypes from "prop-types";
import styled from "styled-components";
import crossIcon from "../../../../svg/cross.svg";
import { useState } from "react";
const AlarmModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  backdrop-filter: blur(1px);
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

const AlarmPanel = styled.div`
  height: 80vh;
  width: 35vw;
  min-width: 35rem;
  border: solid 1px #d1d0e9;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const AlarmTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid black;
`;
const AlarmExitButton = styled.button`
  background: none;
  cursor: pointer;
  border: none;
`;

const AlarmList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

const AlarmItemBox = styled.div`
  margin-bottom: 2rem;
  border: solid 1px #d1d0e9;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 0.75rem;
  margin: 1rem 0;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const AlarmItemTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlarmItemContent = styled.div`
  color: #555555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
`;

const AlarmItemCreatedAt = styled.div`
  color: #555555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
`;
const AlarmItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const HambergerMenu = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 1rem;
  font-size: 1.2rem;
  color: #bfbfbf;

  &:active {
    color: #000000;
  }
`;

const MenuModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

`;

const ExitMenuButton = styled.button`
  width: 80%;
  display: block;
  margin: 2rem 0;
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  border:none;
  cursor: pointer;
`

const MenuButtonBox = styled.div`
  width: 80%;
  display: block;
  background-color: white;
  border:none;
  border-radius: 12px;
`

const MenuDeleteButton = styled.button`
  width: 100%;
  display: block;
  border: none;
  background: none;
  padding: 1rem;
  cursor: pointer;
`

const MenuLinkButton = styled.button`
  width: 100%;
  display: block;
  border: none;
  background: none;
  border-bottom: 1px solid black;
  padding: 1rem;
  cursor: pointer;
`
// 타이틀: 댓글이 달렸습니다.
// 내용: 나 누구인데 이거 맞다.
// 시간: 2025-00-00
//
const sample = [
  {
    id: "1",
    title:
      "댓글이 달렸습니다.1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    content:
      "나 누구인데 이거 맞다.1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    createdAt: "2025-00-00",
  },
  {
    id: "2",
    title: "댓글이 달렸습니다.2",
    content: "나 누구인데 이거 맞다.2",
    createdAt: "2025-00-00",
  },
  {
    id: "3",
    title: "댓글이 달렸습니다.3",
    content: "나 누구인데 이거 맞다.3",
    createdAt: "2025-00-00",
  },
  {
    id: "4",
    title: "댓글이 달렸습니다.4",
    content: "나 누구인데 이거 맞다.4",
    createdAt: "2025-00-00",
  },
];

const AlarmModal = ({ onCloseModal }) => {
  const [alarms, setAlarms] = useState(sample);
  // 상단 바 만들기 전체 삭제 버튼 구현하기 위한
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <AlarmModalBox onClick={onCloseModal}>
      <AlarmPanel onClick={(e) => e.stopPropagation()}>
        {isMenuModalOpen && (
          <MenuModal onClick={() => setIsMenuModalOpen((prev) => !prev)}>
            <MenuButtonBox>
            <MenuLinkButton>이동하기</MenuLinkButton>
              <MenuDeleteButton>삭제하기</MenuDeleteButton>
            </MenuButtonBox>
            <ExitMenuButton>
              취소
            </ExitMenuButton>
          </MenuModal>
        )}
        <AlarmHeader>
          <AlarmTitle>내 소식</AlarmTitle>
          <AlarmExitButton onClick={onCloseModal}>
            <img src={crossIcon} />
          </AlarmExitButton>
        </AlarmHeader>
        <AlarmList>
          {sample.map((data) => (
            <AlarmItemBox key={data.id}>
              <AlarmItemHeader>
                <AlarmItemTitle>{data.title}</AlarmItemTitle>
                <HambergerMenu
                  onClick={() => setIsMenuModalOpen((prev) => !prev)}
                >
                  ⁝
                </HambergerMenu>
              </AlarmItemHeader>
              <AlarmItemContent>{data.content}</AlarmItemContent>
              <AlarmItemCreatedAt>{data.createdAt}</AlarmItemCreatedAt>
            </AlarmItemBox>
          ))}
        </AlarmList>
      </AlarmPanel>
    </AlarmModalBox>
  );
};

AlarmModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default AlarmModal;
