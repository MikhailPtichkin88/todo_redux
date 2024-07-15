import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addressListApi } from '../api/api'
import { IAddressItem } from '@/modules/MapAddressList'

export const useUpdateAddressList = ({
  setAddressList,
}: {
  setAddressList: (items: IAddressItem[]) => void
}) => {
  const queryClient = useQueryClient()

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
