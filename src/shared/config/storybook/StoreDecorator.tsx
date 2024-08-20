import { profileSliceReducer } from '@/modules/ProfileForm'
import { IStateSchema, StoreProvider } from '@/providers/StoreProvider'
import { DeepPartial, TReducersList } from '@/shared/types/types'
import { StoryFn } from '@storybook/react'

const defaultAsyncReducers: TReducersList = {
  profile: profileSliceReducer,
}

export const StoreDecorator =
  (state: DeepPartial<IStateSchema>, asyncReducers?: TReducersList) =>
  (StoryComponent: StoryFn) => {
    return (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    )
  }
