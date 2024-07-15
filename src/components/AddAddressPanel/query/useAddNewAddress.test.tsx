import { act, renderHook, waitFor } from '@testing-library/react'
import { useAddNewAddress } from './useAddNewAddress'

import nock from 'nock'
import { TestProvider } from '@/shared/tests/componentRender'

import { useGetAddressList } from '@/modules/MapAddressList'

const newAddress = {
  address: 'Большая Черкизовская улица',
  coordinates: [53.222, 37.794] as [number, number],
}

describe('useAddNewAddress', () => {
  beforeEach(() => {
    nock(__API__).post('/address_list').reply(200, {})

    nock(__API__).get('/address_list').reply(200, [newAddress])
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call addNewAddress with the correct address', async () => {
    const { result } = renderHook(() => useAddNewAddress(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })
    const spy = jest.spyOn(result.current, 'addNewAddress')
    act(() => {
      result.current.addNewAddress(newAddress)
    })
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(newAddress)
    })
  })

  it('should invalidate the addressList query on successful addition', async () => {
    const { result: AddNewAddressResult } = renderHook(
      () => useAddNewAddress(),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/' } }),
      }
    )

    const { result: addresOptions } = renderHook(() => useGetAddressList(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    act(() => {
      AddNewAddressResult.current.addNewAddress(newAddress)
    })

    await waitFor(() => {
      expect(addresOptions.current.addressList.length).toBe(1)
      expect(addresOptions.current.addressList[0].address).toBe(
        'Большая Черкизовская улица'
      )
      expect(addresOptions.current.addressList[0].coordinates[1]).toBe(37.794)
    })
  })
})
