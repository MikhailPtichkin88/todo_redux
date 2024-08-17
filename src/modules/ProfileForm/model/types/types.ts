export interface IProfileData {
  username: string
  email?: string
  avatar?: string
  password?: string
}

export interface IProfileSchema {
  profile: IProfileData
  isLoading: boolean
}
