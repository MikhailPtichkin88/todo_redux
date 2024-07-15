import { IAddressItem } from '@/modules/MapAddressList'
import { $api } from '@/shared/api/api'

export const addressListApi = {
  updateAddressList: (addressList: IAddressItem[]) => {
    return $api.post<IAddressItem[]>('/update-address-list', {
      newAddressList: addressList,
    })
  },
  deleteAddress: (id: string) => {
    return $api.delete<IAddressItem[]>(`/address_list/${id}`)
  },
}
