import { AddressItem } from '@/ui/AddressItem'
import { Loader } from '@/ui/PageLoader'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { useDeleteAddress } from '../query/useDeleteAddress'
import { useGetAddressList } from '../query/useGetAddressList'
import cls from './AddressList.module.scss'
import { useUpdateAddressList } from '../query/useUpdateAddressList'

export const AddressList = () => {
  const { addressList, isFetching } = useGetAddressList()

  const { deleteAddress, isPending: isDeleting } = useDeleteAddress()

  const { updateList, isPending: isUpdating } = useUpdateAddressList()

  const isLoading = isFetching || isDeleting || isUpdating

  const handleDragEnd = (result: DropResult) => {
    const updatedList = [...addressList]
    const [removedItem] = updatedList.splice(result.source.index, 1)
    updatedList.splice(result.destination.index, 0, removedItem)

    updateList(updatedList)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            className={cls.wrapper}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {isLoading && (
              <div className={cls.loader}>
                <Loader />
              </div>
            )}

            {addressList?.map(({ address, id }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <AddressItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={id}
                    id={id}
                    onDelete={deleteAddress}
                    title={address}
                    disabled={isFetching}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
