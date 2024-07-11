import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addressListApi } from '../api/addressListApi'

export const useDeleteAddress = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteAddress, isPending } = useMutation({
    mutationKey: ['deleteAddress'],
    mutationFn: async (id: string) => {
      try {
        await addressListApi.deleteAddress(id)
      } catch (error) {
        toast.error('Ошибка при удалении адресов')
      }
    },
    onSuccess: () => {
      toast.success('Адрес успешно удален')
      queryClient.invalidateQueries({ queryKey: ['addressList'] })
    },
  })
  return { deleteAddress, isPending }
}
