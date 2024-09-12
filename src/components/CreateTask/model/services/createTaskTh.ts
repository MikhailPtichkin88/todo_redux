import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/providers/StoreProvider'
import { ITask } from '@/components/Task'
import { updateTodoTh } from '@/components/TodoList'
import { getTodoLists } from '@/modules/TodoLists/model/selectors/getTodoLists'

interface IParams {
  listId: number
  name: string
}

export const createTaskTh = createAsyncThunk<
  ITask,
  IParams,
  IThunkConfig<string>
>('tasksListSlice/createTaskTh', async ({ name, listId }, thunkAPI) => {
  const { extra, dispatch, getState, rejectWithValue } = thunkAPI
  const data: Omit<ITask, 'id'> = {
    name,
    listId,
    completed: false,
  }
  try {
    const res = await extra.api.post<ITask>(`/tasks`, data)
    if (!res.data) {
      throw new Error()
    }

    const todolist = getTodoLists(getState())?.find(
      (todo) => todo.id === listId
    )

    if (todolist) {
      await dispatch(
        updateTodoTh({
          todoId: listId,
          data: { taskIds: [...todolist.taskIds, res.data.id] },
        })
      )
    }
    return res.data
  } catch (e) {
    return rejectWithValue('create todo data error')
  }
})
