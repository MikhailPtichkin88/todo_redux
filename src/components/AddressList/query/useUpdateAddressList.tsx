import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addressListApi } from '../api/addressListApi'
import { IAddressItem } from '../types/types'
import { useAddressMenu } from '../store/useAddressMenu'

export const useUpdateAddressList = () => {
  const queryClient = useQueryClient()

  const { setAddressList } = useAddressMenu()

  const { mutate: updateList, isPending } = useMutation({
    mutationKey: ['updateAddressList'],
    mutationFn: async (addressList: IAddressItem[]) => {
      setAddressList(addressList)
      await addressListApi.updateAddressList(addressList)
    },
    onSuccess: () => {
      toast.success('Порядок адресов изменен')
    },
    onError: () => {
      toast.error('Ошибка при обновлении порядка адресов')
      queryClient.invalidateQueries({ queryKey: ['addressList'] })
    },
  })
  return { updateList, isPending }
}
