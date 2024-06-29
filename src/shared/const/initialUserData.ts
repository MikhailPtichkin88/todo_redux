import { IUserData } from '@/modules/HeaderAppBar'

export const initialUserData: Omit<IUserData, 'id'> = {
  email: '',
  password: '',
  username: '',
  avatar: '',
}
