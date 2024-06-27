import { create } from 'zustand'


interface IUserData {
  id: string
  username: string
  email?: string
  avatar?: string
}

export interface IUserStore extends IUserData {
  getIsUserInited: () => boolean;
  setUserData: (userData: IUserData) => void;
  resetUserData: () => void;
}

const initialData: IUserData = {
  id: '',
  username: '',
  email: undefined,
  avatar: undefined,
}

export const useUserStore = create<IUserStore>((set, get) => ({

  ...initialData,

  getIsUserInited: () => {
    const store = get();
    return Boolean(store.id);
  },

  setUserData: (userData: IUserData) => {
    set(() => userData);
  },

  resetUserData: () => {
    set(() => initialData);
  }
}));

