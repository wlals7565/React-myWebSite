import { getDaysMatrixForMonth } from "../../utilities/days/days_utility";
import CalendarMonth from "../../components_v2/presentaions/calendar/CalendarMonth";
import CalendarHeader from "../../components_v2/presentaions/calendar/CalendarHeader";
import CalendarSideBar from "../../components_v2/presentaions/calendar/CalendarSideBar";
import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";

const CalendarBodyBox = styled.div`
  display: flex;
  margin: 1rem 2rem;
`;

const CalendarHeadBox = styled.div`
  display: flex;
  margin: 1rem 2rem;
`;

const CalendarPage = () => {
  // 이번 달 달력 2D 배열
  const [currentMonth, setCurrentMonth] = useState(getDaysMatrixForMonth());
  const [currentDay, setCurrentDay] = useState(dayjs());

  const handleClickNextMonthButton = () => {
    setCurrentDay((day) => {
      const modifiedDay = day.add(1, "months");
      console.log(modifiedDay.year(), modifiedDay.month())
      setCurrentMonth(getDaysMatrixForMonth(modifiedDay.year(), modifiedDay.month()))
      return modifiedDay;
    });
  };

  const handleClickPrevMonthButton = () => {
    setCurrentDay((day) => {
      const modifiedDay = day.subtract(1, "months");
      console.log(modifiedDay.year(), modifiedDay.month())
      setCurrentMonth(getDaysMatrixForMonth(modifiedDay.year(), modifiedDay.month()))
      return modifiedDay;
    });
  };

  const handleClickTodayMonthButton = () => {
    setCurrentDay(() => {
      const today = dayjs();
      setCurrentMonth(getDaysMatrixForMonth(today.year(), today.month()));
      return today;
    });
  };

  return (
    <>
      <CalendarHeadBox>
        {" "}
        <CalendarHeader currentDay={currentDay} handleClickNextMonthButton={handleClickNextMonthButton} handleClickPrevMonthButton={handleClickPrevMonthButton} handleClickTodayMonthButton={handleClickTodayMonthButton} />
      </CalendarHeadBox>
      <CalendarBodyBox>
        <CalendarSideBar />
        <CalendarMonth currentMonth={currentMonth} currentDay={currentDay} />
      </CalendarBodyBox>
    </>
  );
};

export default CalendarPage;
