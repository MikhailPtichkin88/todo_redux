import { IStateSchema } from '@/providers/StoreProvider'

export const getProfileIsLoading = (state: IStateSchema) =>
  state.profile?.isLoading ?? false
