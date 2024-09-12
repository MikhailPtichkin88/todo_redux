import { IStateSchema } from '@/providers/StoreProvider'

export const getTasksIsLoading = (state: IStateSchema) =>
  state?.tasks?.isLoading ?? false
