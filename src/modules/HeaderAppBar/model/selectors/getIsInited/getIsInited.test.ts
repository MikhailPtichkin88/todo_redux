import { IStateSchema } from '@/providers/StoreProvider'
import { DeepPartial } from 'react-hook-form'
import { getIsInited } from './getIsInited'

describe('getIsInited', () => {
  test('should return isInited value of initial state', () => {
    const state: DeepPartial<IStateSchema> = {
      auth: {
        isInited: false,
      },
    }
    expect(getIsInited(state as IStateSchema)).toBe(false)
  })
})
