import { DeepPartial } from '@/shared/types/types'
import { getProfileData } from './getProfileData'
import { IStateSchema } from '@/providers/StoreProvider'

const initialProfileData = {
  username: 'test',
  email: 'test@gmail.com',
}

describe('getProfileData.test', () => {
  test('should return profile data', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        profile: initialProfileData,
      },
    }
    expect(getProfileData(state as IStateSchema)).toEqual(initialProfileData)
    expect(getProfileData(state as IStateSchema).username).toEqual('test')
  })
})
