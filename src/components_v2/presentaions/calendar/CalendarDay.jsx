import PropTypes from "prop-types";
import dayjs from "dayjs";
import styled from "styled-components";

const DayBox = styled.div`
  flex: 1;
  border-right: 1px solid #e9e9eb;
  border-bottom: 1px solid #e9e9eb;
  color: ${({ $isToday }) => ($isToday ? "blue" : "black")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayPhase = styled.p`
  margin: 0.5rem 0 0 0;
  background-color: ${({ $isToday }) => ($isToday ? "#5089EA" : "none")};
  color: ${({ $isToday }) => ($isToday ? "white" : "black")};
  border-radius: 50%;
  text-align: center;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarDay = ({ day, $isToday }) => {
  return (
    <DayBox>
      <DayPhase $isToday={$isToday}>{day.format("D")}</DayPhase>
    </DayBox>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.instanceOf(dayjs).isRequired,
  $isToday: PropTypes.bool.isRequired,
};

export default CalendarDay;
