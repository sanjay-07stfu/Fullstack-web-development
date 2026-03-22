import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Topbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">HabitFlow</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Build consistency every day</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:inline">
            {user?.email}
          </span>
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
