import { useDebounce } from '@/shared/hooks/useDebounce'
import { SearchMenu } from '@/ui/SearchMenu'
import { useGetAddress } from '../query/useGetAddress'
import { IAddressOption } from '../types/types'
import cls from './AddressPanel.module.scss'

import { Loader } from '@/ui/PageLoader'
import { useAddNewAddress } from '../query/useAddNewAddress'

export const AddAddressPanel = () => {
  const { setAddress, addressOptions, isLoading } = useGetAddress()

  const { addNewAddress, isPending } = useAddNewAddress()

  const onInputChange = (value: string) => {
    setAddress(value)
  }
  const debouncedSearch = useDebounce(onInputChange, 1000)

  const onSelect = (value: string) => {
    const item: IAddressOption = addressOptions.find((el) => el.value === value)
    addNewAddress({
      address: item.label,
      coordinates: item.value.split(' ').reverse().map(Number) as [
        number,
        number
      ],
    })
  }

  return (
    <div className={cls.wrapper}>
      <SearchMenu
        loading={isLoading}
        className={cls.menuBtn}
        dropdownClassName={cls.addressDropdown}
        onSelect={onSelect}
        onChangeInput={debouncedSearch}
        options={addressOptions}
        placeholder="Добавить адрес"
      />
      {isPending && <Loader className={cls.loader} />}
    </div>
  )
}
