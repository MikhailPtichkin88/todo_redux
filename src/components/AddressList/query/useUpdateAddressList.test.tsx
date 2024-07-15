import { act, renderHook, waitFor } from '@testing-library/react'
import { toast } from 'sonner'
import nock from 'nock'
import { TestProvider } from '@/shared/tests/componentRender'

import { useGetAddressList } from '@/modules/MapAddressList'
import { useUpdateAddressList } from './useUpdateAddressList'
import { IAddressItem } from '@/modules/MapAddressList'

const updatedData = [
  {
    address: 'Большая Черкизовская улица',
    coordinates: [53.222, 37.794] as [number, number],
    id: '1',
  },
]

describe('useUpdateAddressList', () => {
  beforeEach(() => {
    nock(__API__).post('/update-address-list').reply(200, updatedData)
    nock(__API__).get('/address_list').reply(200, updatedData)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call setUpdate callback with correct data', async () => {
    let items: IAddressItem[]
    const mock = { setAddressList: jest.fn((res) => (items = res)) }

    const { result } = renderHook(() => useUpdateAddressList(mock), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    const spy = jest.spyOn(toast, 'success')
    act(() => {
      result.current.updateList(updatedData)
    })
    await waitFor(() => {
      expect(items[0].id).toBe('1')
      expect(items[0].address).toBe('Большая Черкизовская улица')
      expect(spy).toHaveBeenCalledWith('Порядок адресов изменен')
    })
  })

  it('should recieve updated data', async () => {
    const mock = { setAddressList: jest.fn() }

    const { result: updateResult } = renderHook(
      () => useUpdateAddressList(mock),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/' } }),
      }
    )

    const { result: getResult } = renderHook(() => useGetAddressList(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    act(() => {
      updateResult.current.updateList(updatedData)
    })

    await waitFor(
      () => {
        expect(getResult.current.addressList.length).toBe(1)
        expect(getResult.current.addressList[0].address).toBe(
          'Большая Черкизовская улица'
        )
        expect(getResult.current.addressList[0].coordinates[0]).toBe(53.222)
      },
      { timeout: 4000 }
    )
  })

  it('should toast error message when request fails', async () => {
    nock.restore()
    nock(__API__).post('/update-address-list').replyWithError('error')

    const mock = { setAddressList: jest.fn() }

    const { result: updateResult } = renderHook(
      () => useUpdateAddressList(mock),
      {
        wrapper: ({ children }) =>
          TestProvider({ children, options: { route: '/' } }),
      }
    )

    const spy = jest.spyOn(toast, 'error')

    act(() => {
      updateResult.current.updateList(updatedData)
    })

    await waitFor(
      () => {
        expect(spy).toHaveBeenCalledWith(
          'Ошибка при обновлении порядка адресов'
        )
      },
      { timeout: 4000 }
    )
  })
})
