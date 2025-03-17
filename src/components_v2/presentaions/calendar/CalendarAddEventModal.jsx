import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import dayjs from "dayjs";

// 모달을 담는 박스
const ModalBox = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
`;

// 모달
const Modal = styled.div`
  background-color: white;
  border: 1px solid #bfbfbf;
  border-radius: 20px;
  width: 30vw;
  white-space: nowrap;
`;

// 모달의 메뉴 바
const Menubar = styled.div`
  text-align: right;
  margin: 0.5rem 0.5rem;
`;

// 모달 닫기 버튼
const ExitButton = styled.button`
  border: none;
  background-color: transparent;
`;

// 모달 닫기 버튼 이미지
const ExitImage = styled.img`
  background-color: transparent;
`;

// 모달 내용 1줄
const ModalBodyRow = styled.div`
  margin: 0 0rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
`;

// 모달 색깔 선택 줄
const ModalColorRow = styled.div`
  margin: 0 0rem 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
`;

// 모달 내용 담는 박스
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// input 옆에 있는 라벨
const Label = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
  white-space: nowrap;
  margin-right: 2rem;
`;

// input
const ModalInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid #808080;
  margin-right: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #246beb;
  }
`;

const arrayOfColor = [
  "#4F86F7", // 블루베리
  "#005F6A", // 공작
  "#32612D", // 바질
  "#87A96B", // 세이지
  "#F28500", // 귤
  "#FFE135", // 바나나
  "#FF6347", // 토마토
];

/*
const objOfColor = {
  blueberry: "#4F86F7",
  peacock: "#005F6A",
  basil: "#32612D",
  sage: "#87A96B",
  tangerine: "#F28500",
  banana: "#FFE135",
  tomato: "#FF6347",
};
*/

const ColorButton = styled.button`
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border: none;
  margin-left: 1rem;
  border: ${({ $selectedColor, $color }) =>
    $selectedColor === $color ? "5px solid #000000" : "none"};
`;

const getYYYYMMDD = (day) => {
  return `${day.year()}-${(day.month() + 1).toString().padStart(2, "0")}-${day
    .date()
    .toString()
    .padStart(2, "0")}`;
};

const CalendarAddEventModal = ({
  handleClickCreateSchedule,
  smallCalendarSelectedDay,
  setSmallCalendarSelectedDay
}) => {
  // 선택된 색깔
  const [selectedColor, setSelectedColor] = useState("blueberry");

  const handleDateChange = (e) => {
    // 입력된 값을 dayjs 객체로 변환하여 상태 업데이트
    const newDate = dayjs(e.target.value);
    setSmallCalendarSelectedDay(newDate);
  };

  const handleClickColor = (e) => {
    setSelectedColor(e.target.dataset.color);
  };
  return (
    <ModalBox onClick={handleClickCreateSchedule}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Menubar>
          <ExitButton onClick={handleClickCreateSchedule}>
            <ExitImage src="../../../svg/exitbutton.svg" />
          </ExitButton>
        </Menubar>
        <ModalBody>
          <ModalBodyRow>
            <Label>제목: </Label>
            <ModalInput placeholder="제목을 입력해주세요." />
          </ModalBodyRow>
          <ModalBodyRow>
            <Label>날짜: </Label>
            <ModalInput
              value={getYYYYMMDD(smallCalendarSelectedDay)}
              type="date"
              onChange={handleDateChange}
            />
          </ModalBodyRow>
          <ModalBodyRow>
            <Label>메모: </Label>
            <ModalInput placeholder="메모할 내용을 입력해주세요." />
          </ModalBodyRow>
          <ModalColorRow>
            {arrayOfColor.map((color, index) => (
              <ColorButton
                onClick={handleClickColor}
                type="radio"
                name="color"
                data-color={color}
                key={index}
                $color={color}
                $selectedColor={selectedColor}
              />
            ))}
          </ModalColorRow>
        </ModalBody>
      </Modal>
    </ModalBox>
  );
};

CalendarAddEventModal.propTypes = {
  handleClickCreateSchedule: PropTypes.func.isRequired,
  smallCalendarSelectedDay: PropTypes.instanceOf(dayjs).isRequired,
  setSmallCalendarSelectedDay: PropTypes.func.isRequired,
};

export default CalendarAddEventModal;
