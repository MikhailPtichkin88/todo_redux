import { CreateTodo } from '@/components/CreateTodo'
import { TodoLists } from '@/modules/TodoLists'
import styles from './Main.module.scss'
import descImg from '@/assets/images/todoDesc.jpg'
const Main = () => {
  return (
    <div
      data-testid="MainPage"
      className="flex flex-col gap-[40px] mt-[60px] pb-[20px]"
    >
      <div
        className={styles.backImg}
        style={{
          backgroundImage: `url(${descImg})`,
        }}
      />
      <CreateTodo />

      <TodoLists />
    </div>
  )
}
export default Main
