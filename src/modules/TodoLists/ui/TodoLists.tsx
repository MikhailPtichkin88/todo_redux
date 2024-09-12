import { useAppDispatch } from '@/providers/StoreProvider'
import { useSelector } from 'react-redux'
import { getTodoLists } from '../model/selectors/getTodoLists'
import { useEffect } from 'react'
import { fetchTodosTh } from '../model/services/fetchTodosTh'
import { TodoList } from '../../../components/TodoList/ui/TodoList'
import { fetchTasksTh } from '@/modules/Tasks'
import { getTodoListsIsLoading } from '../model/selectors/getIsTodolistsLoading'
import { Loader } from '@/ui/PageLoader'

export const TodoLists = () => {
  const dispatch = useAppDispatch()
  const todoLists = useSelector(getTodoLists)
  const isLoading = useSelector(getTodoListsIsLoading)

  useEffect(() => {
    if (!todoLists || !todoLists.length) {
      dispatch(fetchTodosTh()).then(() => {
        dispatch(fetchTasksTh())
      })
    }
  }, [])

  if (isLoading && !todoLists?.length) {
    return (
      <div className="flex w-full h-[100px] justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex gap-[40px] flex-wrap">
      {todoLists.map(({ id, name, taskIds, completed }) => (
        <TodoList
          key={id}
          id={id}
          name={name}
          completed={completed}
          taskIds={taskIds}
        />
      ))}
    </div>
  )
}
