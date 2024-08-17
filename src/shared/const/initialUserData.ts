import { IUser } from '@/modules/HeaderAppBar'

export const initialUserData: Omit<IUser, 'id'> = {
  email: '',
  password: '',
  username: '',
  avatar: '',
}
