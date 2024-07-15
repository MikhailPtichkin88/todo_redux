/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestProvider } from '@/shared/tests/componentRender'
import { act, renderHook, waitFor } from '@testing-library/react'
import nock from 'nock'
import { useGetAddress } from './useGetAddress'
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

const mockData = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {},
      featureMember: [
        {
          GeoObject: {
            Point: {
              pos: '55.798465 37.729853',
            },
            name: 'Большая Черкизовская улица',
            description: 'Москва, Россия',
          },
        },
      ],
    },
  },
}

describe('useGetAddress', () => {
  beforeEach(() => {
    nock('https://geocode-maps.yandex.ru')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
      })
      .get(/.*/)
      .reply(200, mockData)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should change loading state', async () => {
    const { result: addressResult } = renderHook(() => useGetAddress(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    act(() => {
      addressResult.current.setAddress('example')
    })

    await waitFor(
      () => {
        expect(addressResult.current.isLoading).toBe(true)
      },
      { timeout: 4000 }
    )
  })

  it('should transform return geo data into options', async () => {
    const { result: addressResult } = renderHook(() => useGetAddress(), {
      wrapper: ({ children }) =>
        TestProvider({ children, options: { route: '/' } }),
    })

    act(() => {
      addressResult.current.setAddress('example')
    })

    await waitFor(
      () => {
        expect(addressResult.current.isSuccess).toBe(true)
        expect(addressResult.current.addressOptions.length).toBe(1)
        expect(addressResult.current.addressOptions[0].label).toBe(
          'Большая Черкизовская улица, Москва, Россия'
        )
        expect(addressResult.current.addressOptions[0].value).toBe(
          '55.798465 37.729853'
        )
      },
      { timeout: 4000 }
    )
  })
})
