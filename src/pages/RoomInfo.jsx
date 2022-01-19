import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react/cjs/react.development'
import { getRoom } from '../services/rooms.services'
import { Image } from 'cloudinary-react'
import LoadingComponent from '../components/Loading'
import SaveRoomButton from '../components/SaveRoomButton/SaveRoomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faBath } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const RoomInfo = () => {
  const params = useParams()
  const roomId = params.id
  const [room, setRoom] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRoom = async () => {
      const res = await getRoom(roomId)
      setRoom(res.data.room)
      setLoading(false)
    }

    loadRoom()
  }, [roomId])

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col justify-center items-center bg-purple-200">
          <div className="bg-white p-10 rounded my-10 w-3/4 2xl:w-2/4">
            <Image cloudName="fede4954" publicId={room?.image} />

            <div className="my-5">
              <div className="flex flex-row justify-between">
                <h1 className="font-bold text-3xl">{room?.title}</h1>
                <SaveRoomButton roomId={roomId} />
              </div>

              <p className="font-medium mb-5">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {room?.location}
              </p>

              <p className="text-lg text-left font-bold">
                {room.price} €/month
              </p>
              <p className="text-sm text-left mb-5">
                {room.isDouble ? 'Double bedroom' : 'Single bedroom'}
              </p>

              <div className="flex w-full justify-start mb-5">
                <div className="flex items-center p-1.5 mr-4">
                  <FontAwesomeIcon icon={faBed} className="mr-2" />
                  <span>{room.totalRooms}</span>
                </div>
                <div className="flex items-center p-1.5 mr-4">
                  <FontAwesomeIcon icon={faBath} className="mr-2" />
                  <span>{room.bathrooms}</span>
                </div>
                <span className="p-1.5">{room.area}m²</span>
              </div>

              <p className="mb-5">{room.description}</p>

              <p className="mb-5">Published by: {room.publishedBy.name}</p>

              <div className="flex flex-row justify-start">
                <p className="text-white bg-green-500 rounded p-1.5 mr-2">
                  <a
                    href={`https://wa.me/?text=${window.location.href}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
                    Share on WhatsApp
                  </a>
                </p>
                <p className="text-green-500 hover:underline p-1.5">
                  <a
                    href={`https://wa.me/34${room?.publishedBy.phone}?text=I'm%20interested%20in%20the%20ad%20you%20published%20in%20Home%20Hopper`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                    Contact the owner
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoomInfo
