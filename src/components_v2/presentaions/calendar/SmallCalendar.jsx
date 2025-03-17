import { useContext, useState } from "react";
import styled from "styled-components";
import CalendarSidebarContext from "../../../contexts/calendar/CalendarSidebarContext";
import dayjs from "dayjs";

const dayOfWeekArray = ["일", "월", "화", "수", "목", "금", "토"];

const SmallCalendarBox = styled.div`
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
`;

const SmallCalendarHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 1rem;
`;

const PrevMonthButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const NextMonthButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeekBox = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const DayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0.2rem;
  border-radius: 50%;
  border: 1px solid transparent;
  aspect-ratio: 1 / 1; /* 정사각형 유지 */
  transition: background-color 0.4s ease-in-out; /* 부드러운 색 변화 */
  background-color: ${({$checkSelected, $checkToday}) => $checkToday? '#246BEB'  : $checkSelected? '#D3E1FB' : 'white'};

  &:hover {
    background-color: ${({$checkSelected, $checkToday}) => $checkToday? '#246BEB'  : $checkSelected? '#D3E1FB' : '#E5E5E5'}; 
  }
`;

const DateBox = styled.p`
  white-space: nowrap;
`;

const checkSelected = (selectedDay, day) => {
  return (selectedDay.date() === day.date() && selectedDay.month() === day.month() && selectedDay.year() === day.year())
}

const checkToday = (day) => {
  return (dayjs().date() === day.date() && dayjs().month() === day.month() && dayjs().year() === day.year())
}

const SmallCalendar = () => {
  const {
    handleClickNextMonthButtonOnSmallCalendar,
    handleClickPrevMonthButtonOnSmallCalendar,
    smallCalendarDay,
    smallCalendarMonth,
    setCurrentDay,
    setSmallCalendarSelectedDay,
    smallCalendarSelectedDay
  } = useContext(CalendarSidebarContext);
  
  const handleClickDay = (e) => {
    const year = e.target.dataset.year
    const month =  e.target.dataset.month
    const date = e.target.dataset.date;
    setSmallCalendarSelectedDay(dayjs(`${year}-${month}-${date}`))
    setCurrentDay(dayjs(`${year}-${month}-${date}`))
  }

  return (
    <SmallCalendarBox>
      <SmallCalendarHeader>
        <DateBox>{`${smallCalendarDay.year()}년 ${
          smallCalendarDay.month() + 1
        }월`}</DateBox>
        <ButtonBox>
          <PrevMonthButton onClick={handleClickPrevMonthButtonOnSmallCalendar}>
            <img src="../../../svg/leftarrow.svg" />
          </PrevMonthButton>
          <NextMonthButton onClick={handleClickNextMonthButtonOnSmallCalendar}>
            <img src="../../../svg/rightarrow.svg" />
          </NextMonthButton>
        </ButtonBox>
      </SmallCalendarHeader>
      <WeekBox>
        {dayOfWeekArray.map((day, index) => (
          <WeekBox key={index}>{day}</WeekBox>
        ))}
      </WeekBox>
      {smallCalendarMonth.map((week, weekIndex) => (
        <WeekBox key={weekIndex}>
          {week.map((day, dayIndex) => (
            <DayBox
              key={dayIndex}
              data-year={day.year()}
              data-month={day.month()+1}
              data-date={day.date()}
              onClick={handleClickDay}
              $checkSelected={checkSelected(smallCalendarSelectedDay, day)}
              $checkToday={checkToday(day)}
            >
              {day.date()}
            </DayBox>
          ))}
        </WeekBox>
      ))}
    </SmallCalendarBox>
  );
};

export default SmallCalendar;
