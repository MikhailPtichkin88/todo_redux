import { $api } from '@/shared/api/api'
import { IAddressItem } from '../types/types'

export const addressListApi = {
  getAddressList: () => {
    return $api.get<IAddressItem[]>('/address_list')
  },
  updateAddressList: (addressList: IAddressItem[]) => {
    return $api.post<IAddressItem[]>('/update-address-list', {
      newAddressList: addressList,
    })
  },
  deleteAddress: (id: string) => {
    return $api.delete<IAddressItem[]>(`/address_list/${id}`)
  },
}
