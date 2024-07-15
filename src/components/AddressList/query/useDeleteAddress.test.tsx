import { act, renderHook, waitFor } from '@testing-library/react'

import { useGetAddressList } from '@/modules/MapAddressList'
import { TestProvider } from '@/shared/tests/componentRender'
import nock from 'nock'
import { toast } from 'sonner'
import { useDeleteAddress } from './useDeleteAddress'

const updatedData = [
  {
    address: 'Большая Черкизовская улица',
    coordinates: [53.222, 37.794] as [number, number],
    id: '1',
  },
]

describe('useDeleteAddress', () => {
  beforeAll(() => {
    nock(__API__).delete('/address_list/test-id').reply(200, '1')
    nock(__API__).get('/address_list').reply(200, updatedData)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should get updated data after delete', async () => {
    const { result } = renderHook(() => useDeleteAddress(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    const { result: getResult } = renderHook(() => useGetAddressList(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    const spy = jest.spyOn(toast, 'success')

    act(() => {
      result.current.deleteAddress('test-id')
    })

    await waitFor(
      () => {
        expect(spy).toHaveBeenCalledWith('Адрес успешно удален')
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
    nock(__API__).delete('/address_list').replyWithError('error')

    const { result: updateResult } = renderHook(() => useDeleteAddress(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    const spy = jest.spyOn(toast, 'error')

    act(() => {
      updateResult.current.deleteAddress('test-id')
    })

    await waitFor(
      () => {
        expect(spy).toHaveBeenCalledWith('Ошибка при удалении адресов')
      },
      { timeout: 4000 }
    )
  })
})
