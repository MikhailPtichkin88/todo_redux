import { renderHook, act } from '@testing-library/react'
import { useAddressList } from './useAddressList'
import { IAddressItem } from '../types/types'

const initialData: IAddressItem[] = [
  {
    address: 'Большая Черкизовская улица',
    coordinates: [53.222, 37.794],
    id: '1',
  },
]

const updatedData: IAddressItem[] = [
  {
    address: 'Новый адрес',
    coordinates: [54.321, 38.987],
    id: '2',
  },
]

describe('useAddressList', () => {
  it('should initialize with an empty addressList', () => {
    const { result } = renderHook(() => useAddressList())
    expect(result.current.addressList).toEqual([])
  })

  it('should update addressList with new data', () => {
    const { result } = renderHook(() => useAddressList())

    act(() => {
      result.current.setAddressList(initialData)
    })

    expect(result.current.addressList).toEqual(initialData)

    act(() => {
      result.current.setAddressList(updatedData)
    })

    expect(result.current.addressList).toEqual(updatedData)
  })
})
