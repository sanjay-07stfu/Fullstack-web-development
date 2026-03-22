import { useState } from 'react'

const defaultForm = {
  title: '',
  description: '',
  category: 'Health',
  frequency: 'daily',
  reminderTime: '08:00',
}

const HabitForm = ({ onAddHabit }) => {
  const [formData, setFormData] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!formData.title.trim()) return

    setSubmitting(true)
    try {
      await onAddHabit({
        ...formData,
        title: formData.title.trim(),
      })

      setFormData(defaultForm)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Habit title"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          required
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <input
          type="time"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {submitting ? 'Adding...' : 'Add Habit'}
        </button>
        <button
          type="button"
          onClick={() => setFormData(defaultForm)}
          className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        >
          Clear
        </button>
      </div>
    </form>
  )
}

export default HabitForm
