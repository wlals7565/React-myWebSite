import PropTypes from "prop-types";
import styled from "styled-components";
import crossIcon from "../../../../svg/cross.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
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
  margin-bottom: 1rem;
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
  overflow-y: auto;
  flex: 1; // 추가: 남은 공간을 모두 차지하도록 설정
  padding: 0.5rem 0; // 추가: 상하 패딩 추가
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
  border: none;
  cursor: pointer;
`;

const MenuButtonBox = styled.div`
  width: 80%;
  display: block;
  background-color: white;
  border: none;
  border-radius: 12px;
`;

const MenuDeleteButton = styled.button`
  width: 100%;
  display: block;
  border: none;
  background: none;
  padding: 1rem;
  cursor: pointer;
`;

const MenuLinkButton = styled.button`
  width: 100%;
  display: block;
  border: none;
  background: none;
  border-bottom: 1px solid black;
  padding: 1rem;
  cursor: pointer;
`;

const DeleteAllAlarmButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #F0F0F0;
  padding: 0.5rem;
  color: #246BEB;
  border-radius: 12px;
  cursor: pointer;
`;

const HeaderMenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const AlarmModal = ({ onCloseModal, alarms, setAlarms }) => {

  const navigate = useNavigate();

  // 상단 바 만들기 전체 삭제 버튼 구현하기 위한
  
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // 메뉴 모달 열 때 특정 알람을 선택했다는 것을 알려야 함.
  const [selectedAlarm, setSelectedAlarm] = useState(undefined);

  // 전체 삭제 버튼을 클릭 시
  const handleClickDeleteAllAlarmButton = () => {
    // 서버로 알람 전체 삭제 요청하는 로직 들어가야 함.
    if(confirm("전체 알람을 삭제하시겠습까?")) {
      setAlarms([]);
    }
  };

  // 삭제 버튼을 클릭 시
  const handleClickDeleteButton = () => {
    // 서버로 특정 알람 삭제 요청하는 로직 들어가야 함.
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== selectedAlarm));
  };

  // 특정 알람의 햄버거 메뉴 클릭 시
  const handleClickHambergerMenuInAlarm = (e) => {
    setSelectedAlarm(e.currentTarget.dataset.id);
    setIsMenuModalOpen((prev) => !prev);
  };

  const handleClickLinkButton = () => {
    const selectedAlarmUrl = alarms.find((alarm) => alarm.id === selectedAlarm).url
    navigate(selectedAlarmUrl)
    onCloseModal()
  }

  return (
    <AlarmModalBox onClick={onCloseModal}>
      <AlarmPanel onClick={(e) => e.stopPropagation()}>
        {/* 메뉴 모달이 따로 존재함. */}
        {isMenuModalOpen && (
          <MenuModal onClick={() => setIsMenuModalOpen((prev) => !prev)}>
            <MenuButtonBox>
              <MenuLinkButton onClick={handleClickLinkButton}>이동하기</MenuLinkButton>
              <MenuDeleteButton onClick={handleClickDeleteButton}>
                삭제하기
              </MenuDeleteButton>
            </MenuButtonBox>
            <ExitMenuButton>취소</ExitMenuButton>
          </MenuModal>
        )}
        <AlarmHeader>
          <AlarmTitle>내 소식</AlarmTitle>
          <AlarmExitButton onClick={onCloseModal}>
            <img src={crossIcon} />
          </AlarmExitButton>
        </AlarmHeader>
        <HeaderMenuBox>
          <DeleteAllAlarmButton onClick={handleClickDeleteAllAlarmButton}>전체 알람 삭제</DeleteAllAlarmButton>
        </HeaderMenuBox>
        <AlarmList>
          {alarms.map((data) => (
            <AlarmItemBox key={data.id}>
              <AlarmItemHeader>
                <AlarmItemTitle>{data.title}</AlarmItemTitle>
                <HambergerMenu
                  data-id={data.id}
                  onClick={handleClickHambergerMenuInAlarm}
                >
                  ⁝
                </HambergerMenu>
              </AlarmItemHeader>
              <AlarmItemContent>{data.content}</AlarmItemContent>
              <AlarmItemCreatedAt>{data.createdAt.split("T")[0]}</AlarmItemCreatedAt>
            </AlarmItemBox>
          ))}
        </AlarmList>
      </AlarmPanel>
    </AlarmModalBox>
  );
};

AlarmModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  alarms: PropTypes.array.isRequired,
  setAlarms:  PropTypes.func.isRequired,
};

export default AlarmModal;
