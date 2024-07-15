import { AddAddressPanel } from '@/components/AddAddressPanel/ui/AddAddressPanel'

import { MapAddressList } from '@/modules/MapAddressList/ui/MapAddressList'
const Main = () => {
  return (
    <div data-testid="MainPage" className="flex flex-col gap-[20px] mb-[20px]">
      <MapAddressList />

      <AddAddressPanel />
    </div>
  )
}
export default Main
