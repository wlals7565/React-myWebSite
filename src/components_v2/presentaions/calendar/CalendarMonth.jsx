import PropTypes from "prop-types";
import styled from "styled-components";

const dayOfWeekArray = ['일요일', '월요일', '화요일','수요일', '목요일', '금요일', '토요일'];

const CalendarOfMonthBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-top: 1px solid #E9E9EB;
  border-left: 1px solid #E9E9EB;
  border-radius: 10px;
  flex: 1;
`;

const WeekBox = styled.div`
  flex: 1;
  display: flex;
`;

const DayBox = styled.div`
  flex: 1;
  border-right: 1px solid #E9E9EB;
  border-bottom: 1px solid #E9E9EB;
  text-align: center;
`

const DayOfWeekBox = styled.div`
  display: flex;
`

const CalendarMonth = ({ currentMonth }) => {
  console.log(currentMonth);
  return (
    <CalendarOfMonthBox>
      <DayOfWeekBox>{dayOfWeekArray.map((val,index) => (<DayBox key={index} style={{padding: '1rem 0'}}>{val}</DayBox>))}</DayOfWeekBox>
      {currentMonth.map((week, index) => (
        <WeekBox key={index}>
          {week.map((day, index) => (
            <DayBox key={index}>{day.format('D')}</DayBox>
          ))}
        </WeekBox>
      ))}
    </CalendarOfMonthBox>
  );
};

CalendarMonth.propTypes = {
  currentMonth: PropTypes.array.isRequired,
}

export default CalendarMonth;
