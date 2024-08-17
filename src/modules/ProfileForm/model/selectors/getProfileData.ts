import { IStateSchema } from '@/providers/StoreProvider'

export const getProfileData = (state: IStateSchema) => state.profile?.profile
