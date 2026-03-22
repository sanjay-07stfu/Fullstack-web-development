// Authentication service wrappers for cleaner components/context.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'

export const signupUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logoutUser = () => signOut(auth)
