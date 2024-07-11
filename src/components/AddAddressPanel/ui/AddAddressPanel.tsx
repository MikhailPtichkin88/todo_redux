import { useAddressStore } from '../store/useAddressStore'
import { useGetAddress } from '../query/useGetAddress'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { SearchMenu } from '@/ui/SearchMenu'
import cls from './AddressPanel.module.scss'
import { IAddressOption } from '../types/types'

import { useAddNewAddress } from '../query/useAddNewAddress'
import { Loader } from '@/ui/PageLoader'

export const AddAddressPanel = () => {
  const { setAddress, addressOptions } = useAddressStore()
  const { isLoading } = useGetAddress()

  const { addNewAddress, isPending } = useAddNewAddress()

  const onInputChange = (value: string) => {
    setAddress(value)
  }
  const debouncedSearch = useDebounce(onInputChange, 2000)

  const onSelect = (value: string) => {
    const item: IAddressOption = addressOptions.find((el) => el.value === value)
    addNewAddress({
      address: item.label,
      coordinates: item.value.split(' ').map((el) => Number(el)) as [
        number,
        number
      ],
    })
  }

  return (
    <div className={cls.wrapper}>
      <SearchMenu
        loading={isLoading}
        dropdownClassName={cls.addressDropdown}
        width={600}
        onSelect={onSelect}
        onChangeInput={debouncedSearch}
        options={addressOptions}
        placeholder="Добавить адрес"
      />
      {isPending && <Loader className={cls.loader} />}
    </div>
  )
}
