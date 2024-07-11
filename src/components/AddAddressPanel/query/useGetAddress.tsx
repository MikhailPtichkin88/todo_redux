import { useQuery } from '@tanstack/react-query'
import { useAddressStore } from '../store/useAddressStore'
import { addressApi } from '../api/api'

export const useGetAddress = () => {
  const { address, setAddressOptions } = useAddressStore()

  const { isLoading } = useQuery({
    queryKey: ['address', address],
    retry: false,
    queryFn: async () => {
      if (address) {
        const {
          data: { response },
        } = await addressApi.getAddress(address)
        setAddressOptions(
          response?.GeoObjectCollection?.featureMember?.map((address) => ({
            value: address.GeoObject.Point.pos,
            label: `${
              address?.GeoObject?.name ?? 'Некорректное название адреса'
            }, ${address?.GeoObject?.description ?? ''}`,
          }))
        )
      }
      return {}
    },
  })

  return { isLoading }
}
