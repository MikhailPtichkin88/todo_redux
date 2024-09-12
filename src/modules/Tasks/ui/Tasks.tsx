import { useSelector } from 'react-redux'
import { getTasksByIds } from '../model/selectors/getTasksByIds'
import { getTasksIsLoading } from '../model/selectors/getTasksIsLoading'
import { Loader } from '@/ui/PageLoader'
import { Task } from '@/components/Task'
import { IStateSchema } from '@/providers/StoreProvider'

interface ITasksProps {
  taskIds: number[]
  onDeleteTask: (id: number) => void
  onAddTask: (id: number) => void
}

export const Tasks = ({ taskIds }: ITasksProps) => {
  const tasks = useSelector((state: IStateSchema) =>
    getTasksByIds(state, taskIds)
  )
  const isLoading = useSelector(getTasksIsLoading)
  if (isLoading) {
    return (
      <div className="flex w-full h-[100px] justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mt-[20px] flex flex-col gap-[10px]">
      {tasks?.map(({ id, listId, completed, name }) => (
        <Task
          key={id}
          id={id}
          listId={listId}
          completed={completed}
          name={name}
        />
      ))}
    </div>
  )
}
