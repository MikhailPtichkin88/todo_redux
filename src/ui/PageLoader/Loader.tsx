import cls from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

export const Loader = ({ className = '' }: LoaderProps) => {
  return (
    <div className={`lds-ellipsis ${cls['lds-ellipsis']}  ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
