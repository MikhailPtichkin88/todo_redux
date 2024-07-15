import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { addressApi } from '../api/api'
import { IAddressItem } from '../types/types'

export const useAddNewAddress = () => {
  const queryClient = useQueryClient()
  const { mutate: addNewAddress, isPending } = useMutation({
    mutationKey: ['createNewAddress'],
    mutationFn: async (address: Omit<IAddressItem, 'id'>) => {
      try {
        await addressApi.addNewAddress(address)
      } catch (error) {
        toast.error('Ошибка при создании нового адресов')
      }
    },
    onSuccess: () => {
      toast.success('Добавлен новый адрес')
      queryClient.invalidateQueries({ queryKey: ['addressList'] })
    },
  })
  return { addNewAddress, isPending }
}
