import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITask } from '../types/types'
import { getTodoLists } from '@/modules/TodoLists/model/selectors/getTodoLists'
import { updateTodoTh } from '@/components/TodoList'

interface IParams {
  listId: number
  taskId: number
}

export const deleteTaskTh = createAsyncThunk<
  number,
  IParams,
  IThunkConfig<string>
>('tasksListsSlice/deleteTaskTh', async ({ taskId, listId }, thunkAPI) => {
  const { extra, rejectWithValue, dispatch, getState } = thunkAPI
  try {
    const res = await extra.api.delete<ITask>(`/tasks/${taskId}`)
    if (!res.data) {
      throw new Error()
    }

    const todolist = getTodoLists(getState())?.find(
      (todo) => todo.id === listId
    )
    if (todolist) {
      dispatch(
        updateTodoTh({
          todoId: listId,
          data: { taskIds: todolist.taskIds.filter((id) => taskId !== id) },
        })
      )
    }

    return taskId
  } catch (e) {
    return rejectWithValue('delete task error')
  }
})
