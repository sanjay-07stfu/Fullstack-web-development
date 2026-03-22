import { useMemo, useState } from 'react'
import { formatDateKey } from '../../utils/date'
import { getCurrentStreak, getLongestStreak } from '../../utils/streak'

const HabitCard = ({ habit, onToggle, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [draft, setDraft] = useState({
    title: habit.title,
    description: habit.description || '',
    category: habit.category || '',
    frequency: habit.frequency || 'daily',
    reminderTime: habit.reminderTime || '08:00',
  })

  const today = formatDateKey()
  const completedToday = habit.completions?.includes(today)

  const stats = useMemo(
    () => ({
      currentStreak: getCurrentStreak(habit.completions ?? []),
      bestStreak: getLongestStreak(habit.completions ?? []),
    }),
    [habit.completions],
  )

  const saveEdit = async () => {
    setSaving(true)
    try {
      await onEdit(habit.id, draft)
      setEditMode(false)
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async () => {
    setToggling(true)
    try {
      await onToggle(habit)
    } finally {
      setToggling(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${habit.title}"?`)
    if (!confirmed) return

    setDeleting(true)
    try {
      await onDelete(habit.id)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {editMode ? (
        <div className="grid gap-2">
          <input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          />
          <input
            value={draft.description}
            onChange={(event) =>
              setDraft((current) => ({ ...current, description: event.target.value }))
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              value={draft.category}
              onChange={(event) =>
                setDraft((current) => ({ ...current, category: event.target.value }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
            <select
              value={draft.frequency}
              onChange={(event) =>
                setDraft((current) => ({ ...current, frequency: event.target.value }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <input
              type="time"
              value={draft.reminderTime}
              onChange={(event) =>
                setDraft((current) => ({ ...current, reminderTime: event.target.value }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              disabled={saving}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="rounded-lg bg-slate-500 px-3 py-2 text-xs font-medium text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{habit.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{habit.description}</p>
            </div>
            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {habit.category}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-4">
            <p>Frequency: {habit.frequency}</p>
            <p>Reminder: {habit.reminderTime || '--:--'}</p>
            <p>Current: {stats.currentStreak}d</p>
            <p>Best: {stats.bestStreak}d</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleToggle}
              disabled={toggling}
              className={`rounded-lg px-3 py-2 text-xs font-medium text-white ${
                completedToday ? 'bg-emerald-600' : 'bg-indigo-600'
              }`}
            >
              {toggling
                ? 'Updating...'
                : completedToday
                  ? 'Completed Today'
                  : 'Mark Complete'}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-medium text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg bg-rose-500 px-3 py-2 text-xs font-medium text-white"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default HabitCard
