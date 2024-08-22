import { IUser } from '@/modules/HeaderAppBar'
import { rtkApi } from '@/shared/api/rtkApi'

export interface ILoginData {
  email: string
  password: string
}

export const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IUser, ILoginData>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),

    register: build.mutation<IUser, ILoginData>({
      query: (arg) => ({
        url: '/user',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
})

export const useLoginMutation = authApi.useLoginMutation
export const useRegisterMutation = authApi.useRegisterMutation
