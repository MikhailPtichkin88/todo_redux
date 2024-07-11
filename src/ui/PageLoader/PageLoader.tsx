import cls from './PageLoader.module.scss'
import { Loader } from './Loader'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className = '' }: PageLoaderProps) => {
  return (
    <div className={`${cls.pageloader} ${className}`}>
      <Loader />
    </div>
  )
}
