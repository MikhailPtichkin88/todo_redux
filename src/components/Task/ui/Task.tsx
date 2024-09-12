import { useAppDispatch } from '@/providers/StoreProvider'
import { Checkbox } from '@/ui/Checkbox'
import { memo, useCallback, useState } from 'react'
import { updateTaskTh } from '../model/services/updateTaskTh'
import { deleteTaskTh } from '../model/services/deleteTaskTh'
import { EditableSpan } from '@/components/EditableSpan'
import { Trash2Icon } from 'lucide-react'

interface ITaskProps {
  id: number
  listId: number
  completed: boolean
  name: string
}

export const Task = memo(({ id, name, listId, completed }: ITaskProps) => {
  const dispatch = useAppDispatch()
  const [loading, setIsLoading] = useState(false)
  const isDisabledClass = loading ? 'opacity-50 pointer-events-none' : ''

  const onChangeTaskName = useCallback(
    async (taskName: string) => {
      if (taskName !== name) {
        setIsLoading(true)
        await dispatch(updateTaskTh({ taskId: id, data: { name } }))
        setIsLoading(false)
      }
    },
    [name, id]
  )

  const onChangeTaskComplete = useCallback(async () => {
    setIsLoading(true)
    await dispatch(
      updateTaskTh({ taskId: id, data: { completed: !completed } })
    )
    setIsLoading(false)
  }, [completed, id])

  const onDeleteTask = useCallback(async () => {
    setIsLoading(true)
    dispatch(deleteTaskTh({ taskId: id, listId }))
  }, [id, listId])

  return (
    <div className="flex w-full items-center gap-[10px]">
      <Checkbox
        checked={completed}
        onCheckedChange={onChangeTaskComplete}
        disabled={loading}
      />
      <EditableSpan
        className={isDisabledClass}
        value={name}
        onInputChange={onChangeTaskName}
      />
      <Trash2Icon
        stroke="darkorange"
        className={`min-w-[24px] cursor-pointer ${isDisabledClass}`}
        onClick={onDeleteTask}
      />
    </div>
  )
})
