import * as React from 'react'
import { ChevronsUpDown, MapPin, Search } from 'lucide-react'

import { Button } from '@/ui/Button'
import { Command, CommandEmpty, CommandGroup } from './Command'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Input } from '../Input'

interface IProps {
  options: { value: string; label: string }[]
  className?: string
  dropdownClassName?: string
  placeholder?: string
  value?: string
  onSelect?: (value: string) => void
  onChangeInput?: (value: string) => void

  loading?: boolean
}

export function Combobox({
  onSelect,
  onChangeInput,
  loading,
  options = [],
  placeholder,
  className = '',
  dropdownClassName,
}: IProps) {
  const [open, setOpen] = useState(false)
  const [currentBtnWidth, setCurrentBtnWidth] = useState(0)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (options?.length) {
        onSelect(options?.[0]?.value)
        setOpen(false)
      }
    }
  }

  const buttonRef = useRef(null)

  useEffect(() => {
    if (buttonRef.current && open) {
      setCurrentBtnWidth(buttonRef.current.offsetWidth)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          role="combobox"
          aria-expanded={open}
          className={`justify-between ${className}`}
        >
          {placeholder || 'Выберите вариант'}
          <MapPin className="ml-2 h-4 w-4 shrink-0 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: currentBtnWidth }} className={`p-0`}>
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              ghost
              onChange={(e) => onChangeInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {loading && <CommandEmpty>загрузка</CommandEmpty>}
          {Boolean(!options?.length) && !loading && (
            <CommandEmpty>Нет данных</CommandEmpty>
          )}
          <CommandGroup className={dropdownClassName}>
            {options?.map((option, index) => (
              <Button
                variant="ghost"
                key={index}
                value={option.value}
                onClick={() => {
                  onSelect(option.value)
                  setOpen(false)
                }}
              >
                {option.label}
              </Button>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
