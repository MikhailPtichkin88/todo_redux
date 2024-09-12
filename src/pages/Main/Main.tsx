import { CreateTodo } from '@/components/CreateTodo'
import { TodoLists } from '@/modules/TodoLists'

const Main = () => {
  return (
    <div data-testid="MainPage" className="flex flex-col gap-[20px] mb-[20px]">
      <CreateTodo />
      <TodoLists />
    </div>
  )
}
export default Main
