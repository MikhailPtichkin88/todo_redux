import { AddressItem } from '@/ui/AddressItem'
import { useGetAddressList } from '../query/useGetAddressList'
import cls from './AddressList.module.scss'
import { useDeleteAddress } from '../query/useDeleteAddress'
import { Loader } from '@/ui/PageLoader'

export const AddressList = () => {
  const { data, isLoading } = useGetAddressList()
  const { deleteAddress, isPending } = useDeleteAddress()

  return (
    <div className={cls.wrapper}>
      {(isLoading || isPending) && (
        <div className={cls.loader}>
          <Loader />
        </div>
      )}
      {data?.map(({ address, id }) => (
        <AddressItem
          key={id}
          id={id}
          onDelete={deleteAddress}
          title={address}
          disabled={isLoading || isPending}
        />
      ))}
    </div>
  )
}
