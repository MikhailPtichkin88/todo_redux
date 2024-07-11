import { forwardRef } from 'react'
import { Label } from '../Label/Label'
import cls from './Input.module.scss'
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ghost?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, ghost = false, ...props }, ref) => {
    const classNames = `${cls.input} ${ghost ? cls.ghost : ''} ${className}`
    return <input type={type} className={classNames} ref={ref} {...props} />
  }
)
Input.displayName = 'Input'

interface IProps extends InputProps {
  wrapperClassName?: string
  label: string
}

export const LabeledInput = forwardRef(
  (
    { label, id, wrapperClassName, ...props }: IProps,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    return (
      <div
        className={`grid w-full max-w-sm items-center gap-1.5 ${wrapperClassName}`}
      >
        <Label htmlFor={id}>{label}</Label>
        <Input ref={ref} id={id} {...props} />
      </div>
    )
  }
)
LabeledInput.displayName = 'LabeledInput'
