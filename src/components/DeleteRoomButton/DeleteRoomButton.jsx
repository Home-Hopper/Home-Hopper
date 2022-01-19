import { deleteRoom } from '../../services/rooms.services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const DeleteRoomButton = ({ id, rooms, setRooms }) => {
  const deleteRoomById = async () => {
    await deleteRoom(id)
    const updatedRoomsList = rooms.filter((room) => {
      return room._id !== id
    })

    setRooms(updatedRoomsList)
  }

  return (
    <button onClick={deleteRoomById} className=" p-2 m-1">
      <FontAwesomeIcon icon={faTrashAlt} className="text-purple-dark" />
    </button>
  )
}

export default DeleteRoomButton
