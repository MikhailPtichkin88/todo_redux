import { act, renderHook } from '@testing-library/react'

import { useAddressStore } from './useAddressStore'

const mockOptions = [
  {
    label: 'Большая Черкизовская улица, Москва, Россия',
    value: '55.798465 37.729853',
  },
  {
    label: 'станция Владимир, Горьковская железная дорога, Россия',
    value: '56.129725 40.419993',
  },
]

describe('useAddressStore', () => {
  it('should set address', () => {
    const { result } = renderHook(() => useAddressStore())

    act(() => {
      result.current.setAddress('Address search request example')
    })

    expect(result.current.address).toBe('Address search request example')
  })

  it('should set address options data', () => {
    const { result } = renderHook(() => useAddressStore())

    act(() => {
      result.current.setAddressOptions(mockOptions)
    })

    expect(result.current.addressOptions).toHaveLength(2)
    expect(result.current.addressOptions[0].label).toBe(
      'Большая Черкизовская улица, Москва, Россия'
    )
    expect(result.current.addressOptions[1].value).toBe('56.129725 40.419993')
  })
})
