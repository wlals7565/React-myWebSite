import dayjs from 'dayjs'

export const getDaysMatrixForMonth = (year = dayjs().year(), month = dayjs().month()) => {
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
  let currentMonthCount = 0-firstDayOfTheMonth;
  const daysMatrix = new Array(6).fill([]).map(() => 
    new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount))
    })
  )
  return daysMatrix;
}