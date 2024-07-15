import { useQuery } from '@tanstack/react-query'

import { toast } from 'sonner'
import { addressListApi } from '../api/api'
import { useAddressList } from '../store/useAddressList'

export const useGetAddressList = () => {
  const { addressList, setAddressList } = useAddressList()
  const { isFetching } = useQuery({
    queryKey: ['addressList'],
    queryFn: async () => {
      try {
        const res = await addressListApi.getAddressList()
        setAddressList(res.data)
        return res.data
      } catch (error) {
        toast.error('Ошибка при получении списка адресов')
      }
    },
  })
  return { addressList, setAddressList, isFetching }
}
