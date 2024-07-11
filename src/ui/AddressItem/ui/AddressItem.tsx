import { GripVertical, Trash2 } from 'lucide-react'
import cls from './AddressItem.module.scss'

interface IAddressItemProps {
  id: string
  title: string
  disabled?: boolean
  onDelete: (id: string) => void
}

export const AddressItem = ({
  id,
  title,
  disabled = false,
  onDelete,
}: IAddressItemProps) => {
  const disabledClass = `${disabled ? '	opacity-70 cursor-auto' : ''}`

  const onDeleteHandler = () => {
    if (!disabled) {
      onDelete(id)
    }
  }
  return (
    <div className={cls.wrapper}>
      <GripVertical className={disabledClass} />
      <p className={cls.title}>{title}</p>
      <Trash2
        onClick={onDeleteHandler}
        className={`cursor-pointer ${disabledClass}`}
      />
    </div>
  )
}
