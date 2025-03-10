import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";

const CalendarHeaderBox = styled.header`
  margin-left: 15rem;
  display: flex;
  align-items: center;
`;

const GoTodayButton = styled.button`
  border: none;
  border-radius: 30px;
  background-color: #246beb;
  padding: 1rem;
  font-size: large;
  font-weight: 700;
  color: white;
  margin-right: 2rem;
`;

const ChangeMonthButton = styled.button`
  border-radius: 50%;
  border: 1px solid #c6c6c6;
  width: 3rem;
  height: 3rem;
  background-color: white;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const CalendarHeader = ({
  handleClickNextMonthButton,
  handleClickPrevMonthButton,
  handleClickTodayMonthButton,
  currentDay,
}) => {
  return (
    <CalendarHeaderBox>
      <GoTodayButton onClick={handleClickTodayMonthButton}>오늘 날짜로 이동</GoTodayButton>
      <ChangeMonthButton onClick={handleClickPrevMonthButton}>
        <img src="../../../svg/leftarrow.svg" />
      </ChangeMonthButton>
      <ChangeMonthButton onClick={handleClickNextMonthButton}>
        <img src="../../../svg/rightarrow.svg" />
      </ChangeMonthButton>
      <h1>{`${currentDay.year()}년 ${currentDay.month()+1}월`}</h1>
    </CalendarHeaderBox>
  );
};

CalendarHeader.propTypes = {
  handleClickNextMonthButton: PropTypes.func.isRequired,
  handleClickPrevMonthButton: PropTypes.func.isRequired,
  handleClickTodayMonthButton: PropTypes.func.isRequired,
  currentDay: PropTypes.instanceOf(dayjs).isRequired
}

export default CalendarHeader;
