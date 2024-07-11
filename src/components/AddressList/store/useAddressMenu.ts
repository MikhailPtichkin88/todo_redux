import { create } from 'zustand'
import { IAddressItem } from '../types/types'

export interface IAddressMenu {
  addressList: IAddressItem[]
  setAddressList: (addressList: IAddressItem[]) => void
}

export const useAddressMenu = create<IAddressMenu>((set) => ({
  addressList: [],

  setAddressList: (addressList) => {
    set(() => ({ addressList }))
  },
}))
