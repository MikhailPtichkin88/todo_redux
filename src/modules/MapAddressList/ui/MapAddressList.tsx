import { AddressList } from '@/components/AddressList'
import { useGetAddressList } from '../query/useGetAddressList'
import { YMap } from '@/components/YMap/ui/YMap'
import cls from './MapAddressList.module.scss'

export const MapAddressList = () => {
  const { addressList, setAddressList, isFetching } = useGetAddressList()

  return (
    <div className={cls.wrapper}>
      <AddressList
        addressList={addressList}
        setAddressList={setAddressList}
        isFetching={isFetching}
      />
      <YMap addressList={addressList} />
    </div>
  )
}
