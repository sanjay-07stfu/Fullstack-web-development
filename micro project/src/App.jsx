import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { HabitProvider } from './context/HabitContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const hasFirebaseConfig = Boolean(import.meta.env.VITE_FIREBASE_API_KEY)

const FirebaseNotice = () => (
  <div className="mx-auto mt-10 max-w-xl rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
    <h2 className="mb-2 text-lg font-semibold">Firebase setup required</h2>
    <p>
      Add your Firebase credentials in a <strong>.env</strong> file using the Vite keys:
      <br />
      <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_AUTH_DOMAIN</code>,
      <code>VITE_FIREBASE_PROJECT_ID</code>, <code>VITE_FIREBASE_STORAGE_BUCKET</code>,
      <code>VITE_FIREBASE_MESSAGING_SENDER_ID</code>, <code>VITE_FIREBASE_APP_ID</code>
    </p>
  </div>
)

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('habit-theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('habit-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const appContent = useMemo(() => {
    if (!hasFirebaseConfig) return <FirebaseNotice />

    return (
      <AuthProvider>
        <HabitProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={(
                <ProtectedRoute>
                  <DashboardPage darkMode={darkMode} setDarkMode={setDarkMode} />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HabitProvider>
      </AuthProvider>
    )
  }, [darkMode])

  return appContent
}

export default App
