import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getLastNDays } from '../../utils/date'

const ProgressCharts = ({ habits }) => {
  const lastWeek = getLastNDays(7)
  const lastMonth = getLastNDays(30)

  const weeklyData = lastWeek.map((day) => ({
    day: day.label,
    completed: habits.filter((habit) => habit.completions?.includes(day.key)).length,
  }))

  const monthlyCompletion = lastMonth.reduce(
    (sum, day) => sum + habits.filter((habit) => habit.completions?.includes(day.key)).length,
    0,
  )

  const monthlyTotal = Math.max(habits.length * 30, 1)

  const pieData = [
    { name: 'Completed', value: monthlyCompletion },
    { name: 'Pending', value: Math.max(monthlyTotal - monthlyCompletion, 0) },
  ]

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="completed" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Monthly Completion</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} fill="#16a34a" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default ProgressCharts
