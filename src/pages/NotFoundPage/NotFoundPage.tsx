import { memo } from 'react'
import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = memo(({ className = '' }: NotFoundPageProps) => {
  return (
    <div
      className={cls.notfoundpage + ` ${className}`}
      data-testid="NotFoundPage"
    >
      Страница не найдена
    </div>
  )
})
