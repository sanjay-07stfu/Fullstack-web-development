import dayjs from 'dayjs'
import { getMonthGrid } from '../../utils/date'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CalendarView = ({ habits }) => {
  const month = dayjs()
  const cells = getMonthGrid(month)

  const completedSet = new Set(
    habits.flatMap((habit) => habit.completions || []),
  )

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Calendar View ({month.format('MMMM YYYY')})
      </h3>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-slate-500">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((cell, index) => {
          if (!cell) return <div key={`empty-${index}`} className="h-10 rounded-md" />

          const completed = completedSet.has(cell.key)

          return (
            <div
              key={cell.key}
              className={`flex h-10 items-center justify-center rounded-md text-sm ${
                completed
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
              title={completed ? 'Completed habits exist for this day' : 'No completion'}
            >
              {cell.day}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CalendarView
