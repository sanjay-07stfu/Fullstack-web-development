import { useEffect, useMemo, useState } from 'react'
import './App.css'

const DAY_MS = 24 * 60 * 60 * 1000
const STORAGE_KEY = 'habitTrackerData'

const formatDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const dateKeyToUtcMs = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

const getCurrentStreak = (completedDates, todayKey) => {
  const doneSet = new Set(completedDates)
  let streak = 0
  let cursor = dateKeyToUtcMs(todayKey)

  while (doneSet.has(formatDateKey(new Date(cursor)))) {
    streak += 1
    cursor -= DAY_MS
  }

  return streak
}

const getLongestStreak = (completedDates) => {
  if (completedDates.length === 0) return 0

  const ordered = [...new Set(completedDates)]
    .map(dateKeyToUtcMs)
    .sort((a, b) => a - b)

  let longest = 1
  let running = 1

  for (let index = 1; index < ordered.length; index += 1) {
    if (ordered[index] - ordered[index - 1] === DAY_MS) {
      running += 1
      longest = Math.max(longest, running)
    } else {
      running = 1
    }
  }

  return longest
}

const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push({
      date: formatDateKey(date),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date,
    })
  }
  return days
}

function App() {
  const [habitName, setHabitName] = useState('')
  const [habits, setHabits] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [sortBy, setSortBy] = useState('streak')
  const [filterActive, setFilterActive] = useState(false)

  const todayKey = useMemo(() => formatDateKey(new Date()), [])
  const last7Days = useMemo(() => getLast7Days(), [])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setHabits(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load habits:', error)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  const addHabit = (event) => {
    event.preventDefault()
    const trimmedName = habitName.trim()

    if (!trimmedName) return

    const newHabit = {
      id: crypto.randomUUID(),
      name: trimmedName,
      completedDates: [],
      createdAt: new Date().toISOString(),
      color: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'][
        habits.length % 5
      ],
    }

    setHabits((currentHabits) => [newHabit, ...currentHabits])
    setHabitName('')
  }

  const toggleToday = (habitId) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) return habit

        const isDoneToday = habit.completedDates.includes(todayKey)

        return {
          ...habit,
          completedDates: isDoneToday
            ? habit.completedDates.filter((date) => date !== todayKey)
            : [...habit.completedDates, todayKey],
        }
      }),
    )
  }

  const toggleDate = (habitId, dateKey) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) return habit

        const isCompleted = habit.completedDates.includes(dateKey)

        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((date) => date !== dateKey)
            : [...habit.completedDates, dateKey],
        }
      }),
    )
  }

  const deleteHabit = (habitId) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== habitId),
    )
  }

  const sortedHabits = useMemo(() => {
    let sorted = [...habits]

    if (filterActive) {
      sorted = sorted.filter((h) => h.completedDates.includes(todayKey))
    }

    sorted.sort((a, b) => {
      if (sortBy === 'streak') {
        return (
          getCurrentStreak(b.completedDates, todayKey) -
          getCurrentStreak(a.completedDates, todayKey)
        )
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })

    return sorted
  }, [habits, sortBy, filterActive, todayKey])

  const stats = useMemo(() => {
    const totalHabits = habits.length
    const completedToday = habits.filter((h) =>
      h.completedDates.includes(todayKey),
    ).length
    const totalCompletions = habits.reduce(
      (sum, h) => sum + h.completedDates.length,
      0,
    )
    const avgStreak =
      habits.length > 0
        ? Math.round(
            habits.reduce((sum, h) => sum + getCurrentStreak(h.completedDates, todayKey), 0) /
              habits.length,
          )
        : 0
    const completionRate =
      habits.length > 0
        ? Math.round(
            (habits.filter((h) => h.completedDates.includes(todayKey)).length /
              habits.length) *
              100,
          )
        : 0

    return {
      totalHabits,
      completedToday,
      totalCompletions,
      avgStreak,
      completionRate,
    }
  }, [habits, todayKey])

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <main className="app-shell">
        <header className="header-section">
          <div className="header-top">
            <div className="header-content">
              <h1 className="app-title">
                <span className="icon">✨</span>
                Habit Tracker
              </h1>
              <p className="app-description">
                Build unstoppable momentum through daily consistency
              </p>
            </div>
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalHabits}</div>
              <div className="stat-label">Total Habits</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.completedToday}</div>
              <div className="stat-label">Done Today</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.completionRate}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.avgStreak}</div>
              <div className="stat-label">Avg Streak</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.totalCompletions}</div>
              <div className="stat-label">Total Done</div>
            </div>
          </div>
        </header>

        <form className="habit-form" onSubmit={addHabit}>
          <div className="form-wrapper">
            <input
              type="text"
              value={habitName}
              onChange={(event) => setHabitName(event.target.value)}
              placeholder="Add a new habit... e.g., Morning Workout"
              aria-label="Habit name"
              className="form-input"
            />
            <button type="submit" className="form-submit">
              <span>+</span> Add
            </button>
          </div>
        </form>

        <div className="controls">
          <div className="sort-controls">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="streak">🔥 Streak</option>
              <option value="name">A-Z Name</option>
              <option value="newest">📅 Newest</option>
            </select>
          </div>
          <button
            className={`filter-btn ${filterActive ? 'active' : ''}`}
            onClick={() => setFilterActive(!filterActive)}
          >
            {filterActive ? '✓ Today Only' : '⊙ All Habits'}
          </button>
        </div>

        <section className="habit-list" aria-live="polite">
          {sortedHabits.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎯</div>
              <h3>Start Building Your Habits</h3>
              <p>Add your first habit and watch your streaks grow!</p>
            </div>
          ) : (
            sortedHabits.map((habit) => {
              const isDoneToday = habit.completedDates.includes(todayKey)
              const currentStreak = getCurrentStreak(
                habit.completedDates,
                todayKey,
              )
              const longestStreak = getLongestStreak(habit.completedDates)
              const streakPercentage = Math.max(
                (currentStreak / Math.max(longestStreak, 1)) * 100,
                0,
              )

              return (
                <article
                  className={`habit-card ${isDoneToday ? 'completed' : ''}`}
                  key={habit.id}
                  style={{ borderLeftColor: habit.color }}
                >
                  <div className="habit-header">
                    <div className="habit-info">
                      <h2 className="habit-name">{habit.name}</h2>
                      <div className="streak-badges">
                        <span
                          className={`badge current ${isDoneToday ? 'active' : ''}`}
                        >
                          🔥 {currentStreak} day{currentStreak === 1 ? '' : 's'}
                        </span>
                        <span className="badge all">
                          ⭐ {longestStreak} best
                        </span>
                      </div>
                    </div>
                    <div
                      className={`completion-indicator ${isDoneToday ? 'done' : ''}`}
                      style={
                        isDoneToday
                          ? {
                              background: `linear-gradient(135deg, ${habit.color} 0%, ${habit.color}dd 100%)`,
                            }
                          : {}
                      }
                    >
                      {isDoneToday ? '✓' : '○'}
                    </div>
                  </div>

                  <div className="streak-progress">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${streakPercentage}%`,
                        background: `linear-gradient(90deg, ${habit.color} 0%, ${habit.color}dd 100%)`,
                      }}
                    ></div>
                  </div>

                  <div className="calendar-grid">
                    {last7Days.map((day) => (
                      <button
                        key={day.date}
                        className={`calendar-day ${
                          habit.completedDates.includes(day.date)
                            ? 'completed'
                            : ''
                        } ${day.date === todayKey ? 'today' : ''}`}
                        onClick={() => toggleDate(habit.id, day.date)}
                        title={day.fullDate.toLocaleDateString()}
                        style={
                          habit.completedDates.includes(day.date)
                            ? {
                                background: habit.color,
                              }
                            : {}
                        }
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>

                  <div className="actions">
                    <button
                      type="button"
                      className={`btn btn-mark ${isDoneToday ? 'done' : 'pending'}`}
                      onClick={() => toggleToday(habit.id)}
                      style={
                        isDoneToday
                          ? {}
                          : {
                              background: habit.color,
                              boxShadow: `0 6px 20px ${habit.color}4d`,
                            }
                      }
                    >
                      {isDoneToday ? '✓ Done Today' : 'Mark Complete'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => deleteHabit(habit.id)}
                    >
                      ✕
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </section>
      </main>
    </div>
  )
}

export default App
