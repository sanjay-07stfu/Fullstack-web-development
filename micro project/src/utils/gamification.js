// Gamification utility: points, levels, and badge unlocks.
import { getLongestStreak } from './streak'

const badgeRules = [
  { id: 'starter', title: 'Starter', description: 'Complete first habit', check: ({ points }) => points >= 10 },
  { id: 'week', title: '7-Day Streak', description: 'Reach a 7 day streak', check: ({ bestStreak }) => bestStreak >= 7 },
  { id: 'month', title: '30-Day Streak', description: 'Reach a 30 day streak', check: ({ bestStreak }) => bestStreak >= 30 },
  { id: 'grinder', title: 'Habit Grinder', description: '100 total points', check: ({ points }) => points >= 100 },
]

export const getGamificationData = (habits) => {
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + (habit.completions?.length ?? 0),
    0,
  )
  const points = totalCompletions * 10
  const level = Math.floor(points / 200) + 1
  const bestStreak = habits.reduce(
    (best, habit) => Math.max(best, getLongestStreak(habit.completions ?? [])),
    0,
  )

  const badges = badgeRules.map((badge) => ({
    ...badge,
    unlocked: badge.check({ points, bestStreak }),
  }))

  return {
    points,
    level,
    bestStreak,
    badges,
  }
}
