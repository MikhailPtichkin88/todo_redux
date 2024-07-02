import { useMutation } from '@tanstack/react-query'
import { profileService } from '../api/profileApi'
import { IProfileData } from '../store/useProfileStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

interface IUpdateProfile {
  userId: string
  setUserData: (data: IProfileData) => void
}

export const useUpdateProfile = ({ userId, setUserData }: IUpdateProfile) => {
  const navigate = useNavigate()

  const {
    mutate: updateProfile,
    data,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ['profile'],
    mutationFn: (data: IProfileData) => {
      if (!data?.password) {
        delete data.password
      }
      return profileService.update({ ...data, id: userId })
    },

    onSuccess: (data) => {
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data))
      setUserData(data)
      toast.success(`Profile successfully updated`)
      navigate('/')
    },
  })
  return { updateProfile, data, isSuccess, isPending }
}
