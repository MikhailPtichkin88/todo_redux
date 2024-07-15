import { create } from 'zustand'
import { IAddressItem } from '../types/types'

export interface IAddressList {
  addressList: IAddressItem[]
  setAddressList: (addressList: IAddressItem[]) => void
}

export const useAddressList = create<IAddressList>((set) => ({
  addressList: [],

  setAddressList: (addressList) => {
    set(() => ({ addressList }))
  },
}))
