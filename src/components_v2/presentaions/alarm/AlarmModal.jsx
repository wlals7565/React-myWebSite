import PropTypes from "prop-types";
import styled from "styled-components";
import crossIcon from '../../../../svg/cross.svg'

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
`

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
`

const AlarmItemTitle = styled.div`
  margin-bottom: 0.5rem;
  white-space: nowrap;       
  overflow: hidden;          
  text-overflow: ellipsis; 
`

const AlarmItemContent = styled.div`
  color: #555555;
  white-space: nowrap;       
  overflow: hidden;          
  text-overflow: ellipsis; 
  margin-bottom: 0.25rem;
`

const AlarmItemCreatedAt = styled.div`
  color: #555555;
  white-space: nowrap;       
  overflow: hidden;          
  text-overflow: ellipsis; 
  font-size: 0.75rem;
`

// 타이틀: 댓글이 달렸습니다.
// 내용: 나 누구인데 이거 맞다.
// 시간: 2025-00-00
// 
const sample = [
  {
    title: "댓글이 달렸습니다.1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    content: "나 누구인데 이거 맞다.1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    createdAt: "2025-00-00",
  },
  {
    title: "댓글이 달렸습니다.2",
    content: "나 누구인데 이거 맞다.2",
    createdAt: "2025-00-00",
  },
  {
    title: "댓글이 달렸습니다.3",
    content: "나 누구인데 이거 맞다.3",
    createdAt: "2025-00-00",
  },
  {
    title: "댓글이 달렸습니다.4",
    content: "나 누구인데 이거 맞다.4",
    createdAt: "2025-00-00",
  },
]


const AlarmModal = ({ onCloseModal }) => {
  
  // 아이템 눌렀을 때 해당 URL로 이동하는 기능도 구현하여야 한다.
  // 모든 아이템에 대해서는 아닌거 같은데 어떻게 구분시키지?
  // 모든 아이템에 대해 URL 이동을 제공하는걸로 하나?
  // 알람 삭제 기능도 있어야 하네
  // 알람 전체 삭제도
  // 알람 모두 읽음도?
  

  return (
    <AlarmModalBox onClick={onCloseModal}>
      <AlarmPanel onClick={(e) => e.stopPropagation()}>
        <AlarmHeader>
          <AlarmTitle>내 소식</AlarmTitle>
          <AlarmExitButton onClick={onCloseModal}><img src={crossIcon}/></AlarmExitButton>
        </AlarmHeader>
        <AlarmList>
          {sample.map((data,i) => <AlarmItemBox key={i}>
            <AlarmItemTitle>
              {data.title}
            </AlarmItemTitle>
            <AlarmItemContent>
              {data.content}
            </AlarmItemContent>
            <AlarmItemCreatedAt>
              {data.createdAt}
            </AlarmItemCreatedAt>
          </AlarmItemBox>)}
        </AlarmList>
      </AlarmPanel>
    </AlarmModalBox>
  );
};

AlarmModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default AlarmModal;
