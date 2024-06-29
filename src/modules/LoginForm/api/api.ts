import { IUserData } from '@/modules/HeaderAppBar'
import { $api } from '@/shared/api/api'

export interface IAuthForm {
  email: string
  password: string
}

export const authService = {
  async main(data: IAuthForm, type: 'login' | 'register') {
    let response
    if (type === 'login') {
      response = await $api.post<IUserData>(`/login`, data)
    }
    if (type === 'register') {
      response = await $api.post<IUserData>(`/user`, data)
    }
    if (response?.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...data } = response.data
      return data
    }
  },
}
