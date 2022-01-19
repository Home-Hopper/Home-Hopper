import * as PATHS from '../utils/paths'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import DeleteRoomButton from '../components/DeleteRoomButton/DeleteRoomButton'
import UpdateRoomModal from '../components/UpdateRoomModal/UpdateRoomModal'
import { AuthContext } from '../context/auth.context'
import { getUserRooms } from '../services/rooms.services'
import LoadingComponent from '../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'

const YourRooms = () => {
  const [rooms, setRooms] = useState([])
  const [needRefresh, setNeedRefresh] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  let [modalRoom, setModalRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    const getRooms = async () => {
      const res = await getUserRooms({ id: user._id })
      setRooms(res.data.userRooms)
      setLoading(false)
    }
    getRooms()
  }, [needRefresh, user])

  return (
    <main className="flex justify-center items-center bg-purple-200 overflow-x-auto">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="w-11/12 flex flex-col">
            <h1 className="text-4xl font-bold text-purple-dark mb-12">
              Your rooms:
            </h1>
            {rooms.length === 0 ? (
              <div>
                <h2>
                  You haven't posted any rooms yet. Start now and rent them in
                  days!
                </h2>
              </div>
            ) : (
              <table className="table:auto lg:table-fixed w-full ">
                <thead className="w-full border-b-4 border-purple-dark text-purple-dark">
                  <tr className="text-center">
                    <th className="px-3  lg:w-5/12 text-left">Title</th>
                    <th className="px-3 lg:w-3/12 text-left  ">Location</th>
                    <th className="px-3   lg:w-1/12 tex">Price €/month</th>
                    <th className="px-3    ">Rented</th>
                    <th className="px-3  ">Ad status</th>
                    <th className="px-3  lg:w-1/12">Manage room</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => {
                    return (
                      <tr
                        key={index + Date.now()}
                        className={
                          room.isAdActive ? 'bg-green-200' : 'bg-red-200'
                        }
                      >
                        <td className="pl-2">{room.title}</td>
                        <td className="pl-2 lg:pl-0">{room.location}</td>
                        <td className="pl-2 lg:pl-0 text-center">
                          {room.price}
                        </td>
                        <td className="pl-2 lg:pl-0 text-center   ">
                          {room.isRented ? 'Yes' : 'No'}
                        </td>
                        <td className="text-center ">
                          {room.isAdActive ? 'Active' : 'Inactive'}
                        </td>
                        <td>
                          <div className="flex justify-center lg:pl-4">
                            <button
                              onClick={() => {
                                openModal()
                                setModalRoom(room)
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPenAlt}
                                className="text-purple-dark"
                              />
                            </button>
                            <DeleteRoomButton
                              id={room._id}
                              setRooms={setRooms}
                              rooms={rooms}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
            <div className="flex justify-start">
              <Link
                to={PATHS.NEWROOM}
                className="bg-yellow text-purple-dark font-bold rounded-lg border-none py-2 px-4 p-2 ml-5 mt-6"
              >
                New room
              </Link>
            </div>
            <UpdateRoomModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              openModal={openModal}
              closeModal={closeModal}
              room={modalRoom}
              needRefresh={needRefresh}
              setNeedRefresh={setNeedRefresh}
            />
          </div>
        </>
      )}
    </main>
  )
}
export default YourRooms
