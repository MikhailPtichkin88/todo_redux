
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
  className?: string
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const reloadPage = () => {
    location.reload()
  }
  return (
    <div className={cls.errorpage}>
      <p>Произошла ошибка</p>
      <button onClick={reloadPage}>Обновить страницу</button>
    </div>
  )
}
