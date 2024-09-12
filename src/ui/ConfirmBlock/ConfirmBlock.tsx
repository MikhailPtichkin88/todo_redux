import cls from './ConfirmBlock.module.scss'
import { Loader } from '../PageLoader'
import { CircleCheckBigIcon, CircleXIcon } from 'lucide-react'

interface ConfirmBlockProps {
  className?: string
  onOkHandler: () => void
  onCancel: () => void
  label?: string
  isLoading?: boolean
}

export const ConfirmBlock = ({
  className,
  label,
  onOkHandler,
  onCancel,
  isLoading,
}: ConfirmBlockProps) => {
  return (
    <div className={`${cls.editParticipantsBlock} ${className}`}>
      {label && <span>{label}</span>}
      {isLoading ? (
        <div className="w-[60px]">
          <Loader className={cls.loader} />
        </div>
      ) : (
        <div className={cls.editParticipantsBlock}>
          <CircleCheckBigIcon
            stroke="green"
            className={cls.okIcon}
            onClick={onOkHandler}
          />
          <CircleXIcon
            stroke="red"
            className={cls.cancelIcon}
            onClick={onCancel}
          />
        </div>
      )}
    </div>
  )
}
