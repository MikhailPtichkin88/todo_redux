import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { create } from 'zustand'


export interface IUserData {
  id: string
  username: string
  email?: string
  avatar?: string
  password?:string
}

export interface IUserStore  {
  _inited: boolean
  user: IUserData
  mockMeRequest: () => void;
  setUserData: (userData: IUserData) => void;
  logout: () => void;
}

const initialData: IUserData = {
  id: '',
  username: '',
  email: undefined,
  avatar: undefined,
}

export const useUserStore = create<IUserStore>((set) => ({

  _inited: false,
  user: initialData,

  mockMeRequest: () => {
    const data = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    if(data){
      set((state)=>({...state, user: JSON.parse(data), _inited: true}))
    }
  },

  setUserData: (userData: IUserData) => {
    set(() => ({user: userData, _inited: true}));
  },

  logout: () => {
    set(() => ({user: initialData, _inited:false}));
  }
}));

