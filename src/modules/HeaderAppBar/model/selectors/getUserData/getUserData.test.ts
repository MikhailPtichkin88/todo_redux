import { IStateSchema } from '@/providers/StoreProvider'
import { getUserData } from './getUserData'
import { DeepPartial } from '@/shared/types/types'

describe('getUserData', () => {
  test('should return user data of initial state', () => {
    const state: DeepPartial<IStateSchema> = {
      auth: {
        user: {
          username: 'test',
          email: 'test@gmail.com',
        },
      },
    }
    expect(getUserData(state as IStateSchema).email).toBe('test@gmail.com')
    expect(getUserData(state as IStateSchema).username).toBe('test')
  })
})
