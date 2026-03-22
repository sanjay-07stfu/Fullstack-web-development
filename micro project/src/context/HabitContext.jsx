import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  addHabit,
  deleteHabit,
  setMoodForDate,
  subscribeHabits,
  subscribeMoods,
  updateHabit,
} from '../services/habitService'
import { useAuth } from './AuthContext'
import { formatDateKey } from '../utils/date'

const HabitContext = createContext(null)

export const HabitProvider = ({ children }) => {
  const { user } = useAuth()
  const [habits, setHabits] = useState([])
  const [moods, setMoods] = useState({})
  const [loading, setLoading] = useState(true)
  const remindedRef = useRef(new Set())

  useEffect(() => {
    if (!user) {
      setHabits([])
      setMoods({})
      setLoading(false)
      return undefined
    }

    setLoading(true)

    const unsubscribeHabits = subscribeHabits(user.uid, (items) => {
      setHabits(items)
      setLoading(false)
    })

    const unsubscribeMoods = subscribeMoods(user.uid, (nextMoods) => {
      setMoods(nextMoods)
    })

    return () => {
      unsubscribeHabits()
      unsubscribeMoods()
    }
  }, [user])

  useEffect(() => {
    if (!user || habits.length === 0) return undefined

    const notifyIfNeeded = () => {
      const now = new Date()
      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      const currentTime = `${hh}:${mm}`
      const today = formatDateKey(now)

      habits.forEach((habit) => {
        if (!habit.reminderTime || habit.reminderTime !== currentTime) return

        const reminderKey = `${habit.id}-${today}-${currentTime}`
        if (remindedRef.current.has(reminderKey)) return

        remindedRef.current.add(reminderKey)

        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`Reminder: ${habit.title}`, {
            body: habit.description || 'Time to complete your habit!',
          })
        }
      })
    }

    const timer = setInterval(notifyIfNeeded, 30 * 1000)
    return () => clearInterval(timer)
  }, [habits, user])

  const createHabit = useCallback(
    async (payload) => {
      if (!user) return
      await addHabit(user.uid, payload)
    },
    [user],
  )

  const editHabit = useCallback(
    async (habitId, updates) => {
      if (!user) return
      await updateHabit(user.uid, habitId, updates)
    },
    [user],
  )

  const removeHabit = useCallback(
    async (habitId) => {
      if (!user) return
      await deleteHabit(user.uid, habitId)
    },
    [user],
  )

  const toggleCompletion = useCallback(
    async (habit) => {
      if (!user) return

      const today = formatDateKey()
      const completions = habit.completions ?? []
      const hasToday = completions.includes(today)

      const nextCompletions = hasToday
        ? completions.filter((value) => value !== today)
        : [...completions, today]

      await updateHabit(user.uid, habit.id, { completions: nextCompletions })
    },
    [user],
  )

  const saveMood = useCallback(
    async (dateKey, mood) => {
      if (!user) return
      await setMoodForDate(user.uid, dateKey, mood)
    },
    [user],
  )

  const completionPercentage = useMemo(() => {
    if (habits.length === 0) return 0
    const today = formatDateKey()
    const todayDone = habits.filter((item) => item.completions?.includes(today)).length
    return Math.round((todayDone / habits.length) * 100)
  }, [habits])

  const value = useMemo(
    () => ({
      habits,
      moods,
      loading,
      completionPercentage,
      createHabit,
      editHabit,
      removeHabit,
      toggleCompletion,
      saveMood,
    }),
    [
      habits,
      moods,
      loading,
      completionPercentage,
      createHabit,
      editHabit,
      removeHabit,
      toggleCompletion,
      saveMood,
    ],
  )

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
}

export const useHabits = () => {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabits must be used inside HabitProvider')
  }
  return context
}
