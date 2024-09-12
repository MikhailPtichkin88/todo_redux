import { ConfirmBlock } from '@/ui/ConfirmBlock'
import { Input } from '@/ui/Input'
import { EditIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface IEditableSpanProps {
  className?: string
  isTitle?: boolean
  value: string
  onInputChange: (value: string) => void
}

export const EditableSpan = ({
  value,
  className,
  isTitle,
  onInputChange,
}: IEditableSpanProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const onConfirmEdit = () => {
    onInputChange(inputValue)
    setIsEdit(false)
  }

  const onCancelEdit = () => {
    setInputValue(value)
    setIsEdit(false)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <div
      className={`flex w-full gap-3 items-center justify-between ${className}`}
    >
      {isEdit ? (
        <>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={onConfirmEdit}
          />
          <ConfirmBlock onCancel={onCancelEdit} onOkHandler={onConfirmEdit} />
        </>
      ) : (
        <>
          <span
            className={`max-w-[250px] max-h-[72px] overflow-hidden text-ellipsis ${
              isTitle ? 'text-lg' : ''
            }`}
          >
            {inputValue}
          </span>
          <EditIcon
            stroke="grey"
            className="cursor-pointer"
            onClick={() => setIsEdit(true)}
          />
        </>
      )}
    </div>
  )
}
