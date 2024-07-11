import { AddAddressPanel } from '@/components/AddAddressPanel/ui/AddAddressPanel'
import { AddressList } from '@/components/AddressList'
import { Map } from '@/components/Map'
const Main = () => {
  return (
    <div data-testid="MainPage">
      <AddAddressPanel />
      <div className="p-[20px]" />
      <AddressList />
      <div className="p-[20px]" />

      <Map points={[]} />
    </div>
  )
}
export default Main
