import { useGetAddressList } from '@/modules/MapAddressList'
import { TestProvider } from '@/shared/tests/componentRender'
import { renderHook, waitFor } from '@testing-library/react'
import nock from 'nock'
import { toast } from 'sonner'

const addressList = [
  {
    address: 'Большая Черкизовская улица',
    coordinates: [53.222, 37.794] as [number, number],
    id: '1',
  },
]

describe('useGetAddressList', () => {
  beforeAll(() => {
    nock(__API__).get('/address_list').reply(200, addressList)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should fetch and set the address list', async () => {
    const { result } = renderHook(() => useGetAddressList(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    await waitFor(
      () => {
        expect(result.current.addressList.length).toBe(1)
        expect(result.current.addressList[0].address).toBe(
          'Большая Черкизовская улица'
        )
        expect(result.current.addressList[0].coordinates[0]).toBe(53.222)
      },
      { timeout: 4000 }
    )
  })

  it('should toast error message when request fails', async () => {
    nock.restore()
    nock(__API__).get('/address_list').replyWithError('error')

    const { result } = renderHook(() => useGetAddressList(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    const spy = jest.spyOn(toast, 'error')

    await waitFor(
      () => {
        expect(result.current.addressList.length).toBe(0)
        expect(spy).toHaveBeenCalledWith('Ошибка при получении списка адресов')
      },
      { timeout: 4000 }
    )
  })
})
