import { useEffect, useMemo, useState } from 'react'
import CalendarView from '../components/calendar/CalendarView'
import ProgressCharts from '../components/dashboard/ProgressCharts'
import StatsOverview from '../components/dashboard/StatsOverview'
import HabitCard from '../components/habits/HabitCard'
import HabitForm from '../components/habits/HabitForm'
import Topbar from '../components/layout/Topbar'
import MoodTracker from '../components/mood/MoodTracker'
import { useHabits } from '../context/HabitContext'
import { getGamificationData } from '../utils/gamification'

const DashboardPage = ({ darkMode, setDarkMode }) => {
  const {
    habits,
    moods,
    loading,
    error,
    completionPercentage,
    createHabit,
    editHabit,
    removeHabit,
    toggleCompletion,
    saveMood,
  } = useHabits()
  const [searchText, setSearchText] = useState('')
  const [frequencyFilter, setFrequencyFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [toast, setToast] = useState(null)

  const gamification = useMemo(() => getGamificationData(habits), [habits])

  const categories = useMemo(
    () => [...new Set(habits.map((item) => item.category).filter(Boolean))],
    [habits],
  )

  const filteredHabits = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase()

    const nextHabits = habits.filter((habit) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        habit.title?.toLowerCase().includes(normalizedSearch) ||
        habit.description?.toLowerCase().includes(normalizedSearch)

      const matchesFrequency =
        frequencyFilter === 'all' || habit.frequency === frequencyFilter

      const matchesCategory =
        categoryFilter === 'all' || habit.category === categoryFilter

      return matchesSearch && matchesFrequency && matchesCategory
    })

    nextHabits.sort((a, b) => {
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '')
      }

      if (sortBy === 'streak') {
        const aScore = (a.completions || []).length
        const bScore = (b.completions || []).length
        return bScore - aScore
      }

      const aCreated = a.createdAt?.seconds || 0
      const bCreated = b.createdAt?.seconds || 0
      return bCreated - aCreated
    })

    return nextHabits
  }, [habits, searchText, frequencyFilter, categoryFilter, sortBy])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const onAddHabit = async (payload) => {
    try {
      await createHabit(payload)
      showToast('Habit added successfully')
    } catch (actionError) {
      showToast(actionError.message || 'Failed to add habit', 'danger')
    }
  }

  const onEditHabit = async (habitId, updates) => {
    try {
      await editHabit(habitId, updates)
      showToast('Habit updated')
    } catch (actionError) {
      showToast(actionError.message || 'Failed to update habit', 'danger')
    }
  }

  const onDeleteHabit = async (habitId) => {
    try {
      await removeHabit(habitId)
      showToast('Habit deleted', 'danger')
    } catch (actionError) {
      showToast(actionError.message || 'Failed to delete habit', 'danger')
    }
  }

  const onToggleHabit = async (habit) => {
    try {
      await toggleCompletion(habit)
      showToast('Completion status updated')
    } catch (actionError) {
      showToast(actionError.message || 'Failed to update completion', 'danger')
    }
  }

  const onSaveMood = async (dateKey, mood) => {
    try {
      await saveMood(dateKey, mood)
      showToast(`Mood saved: ${mood}`)
    } catch (actionError) {
      showToast(actionError.message || 'Failed to save mood', 'danger')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6">
        {toast ? (
          <div
            className={`fixed right-4 top-20 z-50 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg ${
              toast.type === 'danger' ? 'bg-rose-600' : 'bg-emerald-600'
            }`}
          >
            {toast.message}
          </div>
        ) : null}

        <StatsOverview
          totalHabits={habits.length}
          completionPercentage={completionPercentage}
          points={gamification.points}
          level={gamification.level}
          bestStreak={gamification.bestStreak}
        />

        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {gamification.badges.map((badge) => (
              <span
                key={badge.id}
                className={`rounded-full px-3 py-1 text-xs ${
                  badge.unlocked
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
                title={badge.description}
              >
                {badge.title}
              </span>
            ))}
          </div>
        </section>

        <HabitForm onAddHabit={onAddHabit} />

        {error ? (
          <section className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
            <p className="font-medium">Could not load habits from Firestore.</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2">
              Check Firebase Authentication and Firestore rules. If using test mode,
              ensure rules are not expired.
            </p>
          </section>
        ) : null}

        <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-4">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search habits..."
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          />

          <select
            value={frequencyFilter}
            onChange={(event) => setFrequencyFilter(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
            <option value="all">All frequencies</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
            <option value="newest">Sort: Newest</option>
            <option value="title">Sort: Title (A-Z)</option>
            <option value="streak">Sort: Most completions</option>
          </select>
        </section>

        {loading ? (
          <p className="text-sm text-slate-500">Loading habits...</p>
        ) : filteredHabits.length === 0 ? (
          <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              No habits found
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing filters or add a new habit to get started.
            </p>
          </section>
        ) : (
          <section className="grid gap-4 lg:grid-cols-2">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={onToggleHabit}
                onDelete={onDeleteHabit}
                onEdit={onEditHabit}
              />
            ))}
          </section>
        )}

        <ProgressCharts habits={habits} />
        <CalendarView habits={habits} />
        <MoodTracker habits={habits} moods={moods} onSaveMood={onSaveMood} />
      </main>
    </div>
  )
}

export default DashboardPage
