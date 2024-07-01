import { useMutation } from '@tanstack/react-query'
import { IAuthForm, authService } from '../api/api'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { IUserData } from '@/modules/HeaderAppBar'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface IUseAuthProps {
  setUserData: (data: Omit<IUserData, 'password'>) => void
  // navigate:(route: string)=>void
  resetForm: () => void
}

export const useAuth = ({
  setUserData,
  // navigate,
  resetForm,
}: IUseAuthProps) => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: ({
      data,
      type,
    }: {
      data: IAuthForm
      type: 'login' | 'register'
    }) => {
      return authService.main(data, type)
    },
    onSuccess: (data, { type }) => {
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data))
      setUserData(data)
      toast.success(`You have successfully ${type}`)
      resetForm()
      navigate('/')
    },
    onError: (error, { type }) => {
      console.error(error)
      toast.error(`${type} request failed`, {
        description: error?.message ?? '',
      })
      resetForm()
    },
  })
}
