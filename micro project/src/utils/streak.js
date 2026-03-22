// Streak calculations for current and longest completion streaks.
import dayjs from 'dayjs'

export const getCurrentStreak = (completionDates) => {
  if (!completionDates?.length) return 0

  const completionSet = new Set(completionDates)
  let streak = 0
  let cursor = dayjs()

  while (completionSet.has(cursor.format('YYYY-MM-DD'))) {
    streak += 1
    cursor = cursor.subtract(1, 'day')
  }

  return streak
}

export const getLongestStreak = (completionDates) => {
  if (!completionDates?.length) return 0

  const sorted = [...new Set(completionDates)].sort()
  let longest = 1
  let running = 1

  for (let index = 1; index < sorted.length; index += 1) {
    const previous = dayjs(sorted[index - 1])
    const current = dayjs(sorted[index])

    if (current.diff(previous, 'day') === 1) {
      running += 1
      if (running > longest) longest = running
    } else {
      running = 1
    }
  }

  return longest
}
