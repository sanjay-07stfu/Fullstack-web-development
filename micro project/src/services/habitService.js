// Firestore service layer for user habits and mood logs.
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const userHabitsCollection = (uid) => collection(db, 'users', uid, 'habits')
const userMoodsCollection = (uid) => collection(db, 'users', uid, 'moods')

export const subscribeHabits = (uid, callback, onError) =>
  onSnapshot(
    userHabitsCollection(uid),
    (snapshot) => {
      callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
    },
    (error) => {
      if (onError) onError(error)
    },
  )

export const addHabit = (uid, habitData) =>
  addDoc(userHabitsCollection(uid), {
    ...habitData,
    completions: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

export const updateHabit = (uid, habitId, updates) =>
  updateDoc(doc(db, 'users', uid, 'habits', habitId), {
    ...updates,
    updatedAt: serverTimestamp(),
  })

export const deleteHabit = (uid, habitId) =>
  deleteDoc(doc(db, 'users', uid, 'habits', habitId))

export const subscribeMoods = (uid, callback) =>
  onSnapshot(userMoodsCollection(uid), (snapshot) => {
    const moods = {}
    snapshot.docs.forEach((item) => {
      moods[item.id] = item.data().mood
    })
    callback(moods)
  })

export const setMoodForDate = (uid, dateKey, mood) =>
  setDoc(doc(db, 'users', uid, 'moods', dateKey), {
    mood,
    updatedAt: serverTimestamp(),
  })
