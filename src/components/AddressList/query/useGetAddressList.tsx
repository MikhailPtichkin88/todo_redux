import { useQuery } from '@tanstack/react-query'

import { toast } from 'sonner'
import { addressListApi } from '../api/addressListApi'
import { useAddressMenu } from '../store/useAddressMenu'

export const useGetAddressList = () => {
  const { addressList, setAddressList } = useAddressMenu()
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
  return { addressList, isFetching }
}
