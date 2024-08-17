export interface IUser {
  id: string
  email: string
  username?: string
  avatar?: string
  password?: string
}

export interface IAuthSchema {
  isInited: boolean
  user: IUser
}
