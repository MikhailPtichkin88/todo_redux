import { useAppDispatch } from '@/providers/StoreProvider'
import { useState } from 'react'
import { createTaskTh } from '../model/services/createTaskTh'
import { Input } from '@/ui/Input'
import { Button } from '@/ui/Button'
import { useSelector } from 'react-redux'
import { getTasksIsLoading } from '@/modules/Tasks/model/selectors/getTasksIsLoading'

interface ICreateTaskProps {
  todoId: number
  className?: string
}

export const CreateTask = ({ todoId, className }: ICreateTaskProps) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [loading, setIsLoading] = useState(false)

  const onCreateTask = async () => {
    if (!name) {
      return
    }
    setIsLoading(true)
    await dispatch(createTaskTh({ listId: todoId, name }))
    setName('')
    setIsLoading(false)
  }

  return (
    <div className={className}>
      <Input
        placeholder="Add new task"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <Button disabled={loading} variant="outline" onClick={onCreateTask}>
        Create
      </Button>
    </div>
  )
}
