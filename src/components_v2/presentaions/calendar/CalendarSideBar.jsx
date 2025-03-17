import styled from "styled-components";
import SmallCalendarMonth from "./SmallCalendar";
import { useContext } from "react";
import CalendarSidebarContext from "../../../contexts/calendar/CalendarSidebarContext";

const SidebarBox = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const CreateEventButton = styled.button`
  border-radius: 20px;
  border: 1px solid #808080;
  background-color: transparent;
  height: 3rem;
  padding: 0.5rem;
  width: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }
`

const PlusIcon = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
`

const CalendarSideBar = () => {
  const { handleClickCreateSchedule } = useContext(CalendarSidebarContext);
  return (
    <SidebarBox>
      <CreateEventButton onClick={handleClickCreateSchedule}><PlusIcon>+</PlusIcon> 만들기</CreateEventButton>
      <SmallCalendarMonth />
    </SidebarBox>
  );
};

export default CalendarSideBar;
