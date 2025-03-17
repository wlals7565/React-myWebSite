import dayjs from "dayjs";
import PropTypes from "prop-types";
import styled from "styled-components";
import CalendarDay from "./CalendarDay";

const dayOfWeekArray = ['일요일', '월요일', '화요일','수요일', '목요일', '금요일', '토요일'];



const CalendarOfMonthBox = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({$height}) => $height ? $height : "100vh" };
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
  color: ${({ $isToday }) => $isToday ? 'blue' : 'black' };
`

const DayOfWeekBox = styled.div`
  display: flex;
`

const checkToday = (day) => {
  return (dayjs().date() === day.date() && dayjs().month() === day.month() && dayjs().year() === day.year())
}

const CalendarMonth = ({ currentMonth, $height }) => {
  return (
    <CalendarOfMonthBox $height={$height}>
      <DayOfWeekBox>{dayOfWeekArray.map((val,index) => (<DayBox key={index} style={{padding: '1rem 0'}}>{val}</DayBox>))}</DayOfWeekBox>
      {currentMonth.map((week, index) => (
        <WeekBox key={index}>
          {week.map((day, index) => (
            <CalendarDay key={index} $isToday={checkToday(day)} day={day}/>
          ))}
        </WeekBox>
      ))}
    </CalendarOfMonthBox>
  );
};

CalendarMonth.propTypes = {
  currentMonth: PropTypes.array.isRequired,
  $height: PropTypes.string,
}

export default CalendarMonth;
