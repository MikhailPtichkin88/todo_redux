import { GripVertical, Trash2 } from 'lucide-react'
import cls from './AddressItem.module.scss'
import { forwardRef, MutableRefObject } from 'react'

interface IAddressItemProps {
  className?: string
  id: string
  title: string
  disabled?: boolean
  onDelete: (id: string) => void
}

export const AddressItem = forwardRef(
  (
    {
      id,
      title,
      disabled = false,
      onDelete,
      className = '',
      ...rest
    }: IAddressItemProps,
    ref: MutableRefObject<HTMLDivElement>
  ) => {
    const disabledClass = `${disabled ? '	opacity-50 pointer-events-none' : ''}`

    const onDeleteHandler = () => {
      if (!disabled) {
        onDelete(id)
      }
    }
    return (
      <div className={cls.wrapper + ` ${className}`} ref={ref} {...rest}>
        <GripVertical className={disabledClass} />
        <p className={cls.title}>{title}</p>
        <Trash2
          onClick={onDeleteHandler}
          className={`cursor-pointer ${disabledClass}`}
        />
      </div>
    )
  }
)
