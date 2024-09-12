import { EditableSpan } from '@/components/EditableSpan'
import { useAppDispatch } from '@/providers/StoreProvider'
import { Card } from '@/ui/Card'
import { updateTodoTh } from '../model/services/updateTodoTh'
import { GripVertical, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { ConfirmBlock } from '@/ui/ConfirmBlock'
import { deleteTodoTh } from '../model/services/deleteTodoTh'
import { useSelector } from 'react-redux'
import { getTodoListsIsLoading } from '@/modules/TodoLists/model/selectors/getIsTodolistsLoading'
import { Tasks } from '@/modules/Tasks'
import styles from './TodoList.module.scss'
import { CreateTask } from '@/components/CreateTask'

interface ITodoListProps {
  id: number
  name: string
  completed: boolean
  taskIds: number[]
}

export const TodoList = ({
  id: todoId,
  name,
  completed,
  taskIds,
}: ITodoListProps) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useAppDispatch()
  const loading = useSelector(getTodoListsIsLoading)

  const onChangeTodoName = (name: string) => {
    dispatch(updateTodoTh({ todoId, data: { name } }))
  }

  const onAddTask = (taskId: number) => {
    dispatch(updateTodoTh({ todoId, data: { taskIds: [...taskIds, taskId] } }))
  }
  const onDeleteTask = (taskId: number) => {
    dispatch(
      updateTodoTh({
        todoId,
        data: { taskIds: taskIds.filter((id) => id !== taskId) },
      })
    )
  }

  const onDeleteTodo = () => {
    dispatch(deleteTodoTh(todoId)).then(() => setShowConfirm(false))
  }

  return (
    <Card className={styles.card}>
      <div className="flex items-center">
        <GripVertical className="mr-[10px]" />
        <div className="mb-auto">
          <div className={styles.titleBlock}>
            <EditableSpan
              isTitle
              value={name}
              onInputChange={onChangeTodoName}
              className={styles.editableSpan}
            />

            <div className="flex items-center gap-[10px]">
              {showConfirm ? (
                <ConfirmBlock
                  isLoading={loading}
                  onOkHandler={onDeleteTodo}
                  onCancel={() => setShowConfirm(false)}
                />
              ) : (
                <Trash2Icon
                  stroke="darkorange"
                  className="cursor-pointer"
                  onClick={() => setShowConfirm(true)}
                />
              )}
            </div>
          </div>
          <hr />
          <CreateTask todoId={todoId} className={styles.createTask} />
          <Tasks
            taskIds={taskIds}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      </div>
    </Card>
  )
}
