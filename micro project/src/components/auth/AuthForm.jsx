import { useState } from 'react'

const AuthForm = ({ title, subtitle, onSubmit, submitLabel, footer }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onSubmit(email, password)
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-300 transition focus:ring dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-300 transition focus:ring dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          required
        />

        {error ? <p className="text-sm text-rose-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 px-3 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Please wait...' : submitLabel}
        </button>
      </form>

      <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">{footer}</div>
    </div>
  )
}

export default AuthForm
