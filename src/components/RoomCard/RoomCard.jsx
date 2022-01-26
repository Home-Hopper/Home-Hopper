import { Image } from 'cloudinary-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faBath } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import SaveRoomButton from '../SaveRoomButton/SaveRoomButton'
import * as PATHS from '../../utils/paths'

const RoomCard = ({ room }) => {
  return (
    <div className="w-60 m-7 rounded-xl flex flex-col  shadow-md bg-white">
      <Image
        cloudName="fede4954"
        publicId={room.image}
        className="h-44 w-full object-cover  rounded-t-xl "
      />
      <div className="p-4 flex flex-col items-start">
        <div className="w-full flex">
          <div className="w-9/12 flex flex-col">
            <span className="text-gray-400 text-lg text-left font-bold">
              {room.price} €/month
            </span>
            <span className="text-sm text-left text-gray-700">
              {room.isDouble ? 'Double bedroom' : 'Single bedroom'}
            </span>
          </div>
          <div className="flex flex-grow justify-center items-center ">
            <SaveRoomButton roomId={room._id} />
          </div>
        </div>
        <div className="overflow-y-hidden overflow-ellipsis h-14 flex items-center mt-2">
          <span className="tex-lg mb-4 overflow-x-hidden fade2 text-left ">
            {room.title}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          <span className="fade1">{room.location}</span>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBed} className="mr-2" />
            <span>{room.totalRooms}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBath} className="mr-2" />
            <span>{room.bathrooms}</span>
          </div>
          <span>{room.area}m²</span>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Link
            to={PATHS.FORRENT + '/' + room._id}
            className="bg-yellow text-purple-dark font-bold rounded-xl py-2 px-6"
          >
            View house
          </Link>
        </div>
      </div>
    </div>
  )
}
export default RoomCard
