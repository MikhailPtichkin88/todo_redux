import { DeepPartial } from '@/shared/types/types'
import { IStateSchema } from '@/providers/StoreProvider'
import { getProfileIsLoading } from './getProfileIsLoading'

describe('getProfileIsLoading.test', () => {
  test('should return profile isLoading state', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        isLoading: true,
      },
    }
    expect(getProfileIsLoading(state as IStateSchema)).toEqual(true)
  })
})
