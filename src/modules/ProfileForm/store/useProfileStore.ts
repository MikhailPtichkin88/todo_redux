import { initialUserData } from '@/shared/const/initialUserData'
import { create } from 'zustand'

export interface IProfileData {
  username: string
  email?: string
  avatar?: string
  password?: string
}

export interface IProfileStore {
  profile: IProfileData
  setProfileData: (userData: IProfileData) => void
  resetProfileData: () => void
}

export const useProfileStore = create<IProfileStore>((set) => ({
  profile: initialUserData,

  setProfileData: (userData: IProfileData) => {
    set(() => ({ profile: userData }))
  },
  resetProfileData: () => {
    set(() => ({ profile: initialUserData }))
  },
}))
