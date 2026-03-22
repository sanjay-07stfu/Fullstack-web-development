// Date utilities shared across charts, calendar, and completion logic.
import dayjs from 'dayjs'

export const formatDateKey = (date = dayjs()) => dayjs(date).format('YYYY-MM-DD')

export const getLastNDays = (days = 7) =>
  Array.from({ length: days }, (_, index) => {
    const date = dayjs().subtract(days - index - 1, 'day')
    return {
      key: date.format('YYYY-MM-DD'),
      label: date.format('ddd'),
      monthLabel: date.format('DD MMM'),
    }
  })

export const getMonthGrid = (monthDate = dayjs()) => {
  const startOfMonth = monthDate.startOf('month')
  const startWeekday = startOfMonth.day()
  const daysInMonth = monthDate.daysInMonth()

  const cells = []
  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = monthDate.date(day)
    cells.push({
      day,
      key: date.format('YYYY-MM-DD'),
    })
  }

  return cells
}
