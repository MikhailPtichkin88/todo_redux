import { deleteTodoTh, ITodo, updateTodoTh } from '@/components/TodoList'
import { IStateSchema } from '@/providers/StoreProvider'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { fetchTodosTh } from '../services/fetchTodosTh'
import { ITodoListsSchema } from '../types/types'
import { createTodoTh } from '@/components/CreateTodo'

const todoListAdapter = createEntityAdapter<ITodo>()

export const getTodoListsSelector = todoListAdapter.getSelectors<IStateSchema>(
  (state) => state.todos || todoListAdapter.getInitialState()
)

const initialState: ITodoListsSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
}

const todoListsSlice = createSlice({
  name: 'todoListsSlice',
  initialState: todoListAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTodosTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodosTh.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchTodosTh.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = undefined
        todoListAdapter.setMany(state, action.payload)
      })

      // create
      .addCase(createTodoTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTodoTh.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createTodoTh.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = undefined
        todoListAdapter.addOne(state, action.payload)
      })

      // update
      .addCase(updateTodoTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTodoTh.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateTodoTh.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = undefined
        todoListAdapter.setOne(state, action.payload)
      })

      // delete
      .addCase(deleteTodoTh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTodoTh.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(deleteTodoTh.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = undefined
        todoListAdapter.removeOne(state, action.payload)
      })
  },
})
export const { actions: todoListsActions } = todoListsSlice
export const { reducer: todoListsReducer } = todoListsSlice
