import { useQuery } from '@tanstack/react-query'

import { toast } from 'sonner'
import { addressListApi } from '../api/addressListApi'

export const useGetAddressList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['addressList'],
    queryFn: async () => {
      try {
        const res = await addressListApi.getAddressList()
        return res.data
      } catch (error) {
        toast.error('Ошибка при получении списка адресов')
      }
    },
  })

  return { data, isLoading }
}
