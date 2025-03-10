import React, { useState } from "react";
import { getDaysMatrixForMonth } from "../../utilities/days/days_utility";
import CalendarMonth from "../../components_v2/presentaions/calendar/CalendarMonth";
import CalendarHeader from "../../components_v2/presentaions/calendar/CalendarHeader";
import CalendarSideBar from "../../components_v2/presentaions/calendar/CalendarSideBar";
import styled from "styled-components";

const CalenderBodyBox = styled.div`
  display: flex;
  margin: 5rem 2rem;
`;

const CalendarPage = () => {
  // 이번 달 달력 2D 배열
  const [currentMonth, setCurrentMonth] = useState(getDaysMatrixForMonth())
  return (
    <>
      <CalendarHeader />
      <CalenderBodyBox>
        <CalendarSideBar />
        <CalendarMonth currentMonth={currentMonth} />
      </CalenderBodyBox>
    </>
  );
};

export default CalendarPage;
