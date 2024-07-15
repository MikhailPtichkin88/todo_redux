import { useQuery } from '@tanstack/react-query'
import { useAddressStore } from '../store/useAddressStore'
import { addressApi } from '../api/api'

export const useGetAddress = () => {
  const { address, setAddressOptions, setAddress, addressOptions } =
    useAddressStore()

  const { isLoading, isSuccess } = useQuery({
    queryKey: ['address', address],
    retry: false,
    queryFn: async () => {
      if (address) {
        const {
          data: { response },
        } = await addressApi.getAddress(address)
        setAddressOptions(
          response?.GeoObjectCollection?.featureMember?.map((address) => {
            return {
              value: address.GeoObject.Point.pos,
              label: `${
                address?.GeoObject?.name ?? 'Некорректное название адреса'
              }, ${address?.GeoObject?.description ?? ''}`,
            }
          })
        )
      }
      return {}
    },
  })

  return { isLoading, addressOptions, setAddressOptions, setAddress, isSuccess }
}
