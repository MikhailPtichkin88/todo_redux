import { create } from 'zustand'
import { IAddressOption } from '../types/types'

interface AddressState {
  address: string
  addressOptions: IAddressOption[]
  setAddress: (newAddress: string) => void
  setAddressOptions: (options: IAddressOption[]) => void
}

export const useAddressStore = create<AddressState>((set) => ({
  address: '',
  addressOptions: [],
  setAddress: (newAddress) => set({ address: newAddress }),
  setAddressOptions: (options) => set({ addressOptions: options }),
}))
