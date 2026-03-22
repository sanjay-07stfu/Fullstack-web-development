import { useMemo } from 'react'
import { formatDateKey, getLastNDays } from '../../utils/date'

const moodOptions = [
  { key: 'happy', label: '😊 Happy' },
  { key: 'neutral', label: '😐 Neutral' },
  { key: 'sad', label: '😔 Sad' },
]

const MoodTracker = ({ habits, moods, onSaveMood }) => {
  const today = formatDateKey()
  const todayMood = moods[today]

  const correlation = useMemo(() => {
    const last30 = getLastNDays(30)
    const moodStats = {
      happy: { days: 0, completionRateSum: 0 },
      neutral: { days: 0, completionRateSum: 0 },
      sad: { days: 0, completionRateSum: 0 },
    }

    last30.forEach((day) => {
      const mood = moods[day.key]
      if (!mood || !moodStats[mood]) return

      const totalHabits = habits.length
      const completedCount = habits.filter((habit) => habit.completions?.includes(day.key)).length
      const rate = totalHabits === 0 ? 0 : Math.round((completedCount / totalHabits) * 100)

      moodStats[mood].days += 1
      moodStats[mood].completionRateSum += rate
    })

    return moodOptions.map((mood) => {
      const data = moodStats[mood.key]
      return {
        label: mood.label,
        averageCompletion:
          data.days === 0 ? 0 : Math.round(data.completionRateSum / data.days),
      }
    })
  }, [habits, moods])

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Mood Tracker</h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Log your daily mood and observe habit completion correlation.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {moodOptions.map((mood) => (
          <button
            key={mood.key}
            type="button"
            onClick={() => onSaveMood(today, mood.key)}
            className={`rounded-lg px-3 py-2 text-sm ${
              todayMood === mood.key
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {correlation.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700"
          >
            <p className="text-slate-600 dark:text-slate-300">{item.label}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {item.averageCompletion}%
            </p>
            <p className="text-xs text-slate-500">Avg completion</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoodTracker
