import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import HabitFlowLogo from '../components/layout/HabitFlowLogo'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async (email, password) => {
    await signup(email, password)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-50 to-purple-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-center">
          <HabitFlowLogo />
        </div>
        <AuthForm
          title="Create account"
          subtitle="Start tracking your habits"
          onSubmit={handleSignup}
          submitLabel="Sign up"
          footer={(
            <p>
              Already have an account?{' '}
              <Link className="font-medium text-indigo-600" to="/login">
                Login
              </Link>
            </p>
          )}
        />
      </div>
    </div>
  )
}

export default SignupPage
