import { getDaysMatrixForMonth } from "../../utilities/days/days_utility";
import CalendarMonth from "../../components_v2/presentaions/calendar/CalendarMonth";
import CalendarHeader from "../../components_v2/presentaions/calendar/CalendarHeader";
import CalendarSideBar from "../../components_v2/presentaions/calendar/CalendarSideBar";
import styled from "styled-components";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import CalendarSidebarContext from "../../contexts/calendar/CalendarSidebarContext";
import CalendarAddEventModal from "../../components_v2/presentaions/calendar/CalendarAddEventModal";

const CalendarBodyBox = styled.div`
  display: flex;
  margin: 1rem 1rem;
`;

const CalendarHeadBox = styled.div`
  display: flex;
  margin: 1rem 2rem;
`;

const CalendarPage = () => {
  // 이번 달 달력 2D 배열
  const [currentMonth, setCurrentMonth] = useState(getDaysMatrixForMonth());
  // 현재 년 월 일
  const [currentDay, setCurrentDay] = useState(dayjs());
  // 작은 달력의 해당 달 2D 배열
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(
    getDaysMatrixForMonth()
  );
  // 작은 달력의 년 월 일
  const [smallCalendarDay, setSmallCalendarDay] = useState(dayjs());

  // 작은 달력에서 선택된 년 월 일
  const [smallCalendarSelectedDay, setSmallCalendarSelectedDay] = useState(
    dayjs()
  );

  // 모달 오픈 여부
  const [openModal, setOpenModal] = useState(false);

  // currentDay가 변경될 때 currentMonth 자동 업데이트
  useEffect(() => {
    setCurrentMonth(
      getDaysMatrixForMonth(currentDay.year(), currentDay.month())
    );
    setSmallCalendarDay(currentDay);
  }, [currentDay]);

  // smallCalendarDay가 변경될 때 smallCalendarMonth 자동 업데이트
  useEffect(() => {
    setSmallCalendarMonth(
      getDaysMatrixForMonth(smallCalendarDay.year(), smallCalendarDay.month())
    );
  }, [smallCalendarDay]);

  // 다음 달 이동 (큰 달력)
  const handleClickNextMonthButton = useCallback(() => {
    setCurrentDay((day) => day.add(1, "months"));
  }, []);

  // 이전 달 이동 (큰 달력)
  const handleClickPrevMonthButton = useCallback(() => {
    setCurrentDay((day) => day.subtract(1, "months"));
  }, []);

  // 다음 달 이동 (작은 달력)
  const handleClickNextMonthButtonOnSmallCalendar = useCallback(() => {
    setSmallCalendarDay((day) => day.add(1, "months"));
  }, []);

  // 이전 달 이동 (작은 달력)
  const handleClickPrevMonthButtonOnSmallCalendar = useCallback(() => {
    setSmallCalendarDay((day) => day.subtract(1, "months"));
  }, []);

  // 오늘 날짜로 이동
  const handleClickTodayMonthButton = useCallback(() => {
    const today = dayjs();
    setCurrentDay(today);
  }, []);

  // 모달 만들면서 생각 정리 할 것
  // 이벤트 만들기 버튼 누를떄 기존 상태를 가지고 오는 형식으로 만들 것
  // useState로 모달 쪽도 업데이트 해주기
  //

  const handleClickCreateSchedule = (e) => {
    setOpenModal((prev) => !prev);
    e.stopPropagation();
  };

  return (
    <>
      <CalendarHeadBox>
        {openModal ? (
          <CalendarAddEventModal
            handleClickCreateSchedule={handleClickCreateSchedule}
            smallCalendarSelectedDay={smallCalendarSelectedDay}
            setSmallCalendarSelectedDay={setSmallCalendarSelectedDay}
          />
        ) : undefined}
        <CalendarHeader
          currentDay={currentDay}
          handleClickNextMonthButton={handleClickNextMonthButton}
          handleClickPrevMonthButton={handleClickPrevMonthButton}
          handleClickTodayMonthButton={handleClickTodayMonthButton}
        />
      </CalendarHeadBox>
      <CalendarBodyBox>
        <CalendarSidebarContext.Provider
          value={{
            handleClickNextMonthButtonOnSmallCalendar,
            handleClickPrevMonthButtonOnSmallCalendar,
            smallCalendarDay,
            smallCalendarMonth,
            setCurrentDay,
            currentDay,
            handleClickCreateSchedule,
            setSmallCalendarSelectedDay,
            smallCalendarSelectedDay,
          }}
        >
          <CalendarSideBar
            smallCalendarMonth={smallCalendarMonth}
            handleClickPrevMonthButtonOnSmallCalendar={
              handleClickPrevMonthButtonOnSmallCalendar
            }
            handleClickNextMonthButtonOnSmallCalendar={
              handleClickNextMonthButtonOnSmallCalendar
            }
          />
        </CalendarSidebarContext.Provider>
        <CalendarMonth
          currentMonth={currentMonth}
          currentDay={currentDay}
          $height={"100vh"}
        />
      </CalendarBodyBox>
    </>
  );
};

export default CalendarPage;
