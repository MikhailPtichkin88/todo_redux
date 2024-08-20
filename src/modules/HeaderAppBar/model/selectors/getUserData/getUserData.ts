import { IStateSchema } from '@/providers/StoreProvider'

export const getUserData = (state: IStateSchema) => state.auth?.user
