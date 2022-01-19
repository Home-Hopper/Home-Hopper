import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react/cjs/react.development'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { updateSavedRooms } from '../../services/rooms.services'
import * as PATHS from '../../utils/paths'
import { Link } from 'react-router-dom'

const SaveRoomButton = ({ roomId }) => {
  const [icon, setIcon] = useState(faHeart)
  const { user, setUser } = useContext(AuthContext)
  const iconStyle = {
    ...(icon === faHeart && { color: 'tomato' }),
  }

  useEffect(() => {
    if (user?.savedRooms.includes(roomId)) {
      setIcon(faHeart)
    } else {
      setIcon(faEmptyHeart)
    }
  }, [roomId, user?.savedRooms])

  const updateSaved = async () => {
    if (icon === faHeart) setIcon(faEmptyHeart)
    else {
      setIcon(faHeart)
    }
    const res = await updateSavedRooms(user._id, roomId)
    setUser({ ...res.data.user })
  }

  return (
    <>
      {user && (
        <button onClick={updateSaved}>
          <FontAwesomeIcon
            icon={icon}
            className="text-2xl text-gray-700"
            style={iconStyle}
          />
        </button>
      )}
      {!user && (
        <Link to={PATHS.LOGINPAGE}>
          <FontAwesomeIcon
            icon={faEmptyHeart}
            className="text-2xl text-gray-700"
          />
        </Link>
      )}
    </>
  )
}
export default SaveRoomButton
