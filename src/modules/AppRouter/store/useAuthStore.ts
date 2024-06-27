import { create } from 'zustand'
import { USER_LOCALSTORAGE_KEY } from '../../../shared/const/localstorage'

interface IAuthStore {
  isAuthorized: boolean
  checkAuthorized: () => void
  setAuthToken: (token: string) =>void
  deleteAuthToken: ()=>void
}

export const useAuthStore = create<IAuthStore>()((set, get) => ({
  isAuthorized: false,
  
  checkAuthorized: () => {
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    set(()=>({isAuthorized: !!token}))
  },

  setAuthToken: (token: string)=>{
    const authToken = `Bearer ${token}`
    localStorage.setItem(USER_LOCALSTORAGE_KEY, authToken)
    set(()=>({isAuthorized: true}))
  },

  deleteAuthToken: ()=>{
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    set(()=>({isAuthorized: false}))
  }
}))
