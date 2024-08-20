import { IStateSchema } from '@/providers/StoreProvider'

export const getIsInited = (state: IStateSchema) =>
  state.auth?.isInited ?? false
