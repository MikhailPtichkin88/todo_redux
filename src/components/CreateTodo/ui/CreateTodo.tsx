import { useAppDispatch } from '@/providers/StoreProvider'
import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'
import { useState } from 'react'
import { createTodoTh } from '../model/services/createTodoTh'

export const CreateTodo = () => {
  const [todoName, setTodoName] = useState('')
  const dispatch = useAppDispatch()

  const onCreateTodo = () => {
    if (todoName) {
      dispatch(createTodoTh(todoName))
    }
  }

  return (
    <div className="flex gap-3 items-center max-w-[600px]">
      <Input
        placeholder="Add new todolist"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <Button variant="outline" onClick={onCreateTodo}>
        Create
      </Button>
    </div>
  )
}
