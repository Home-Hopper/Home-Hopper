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
  const [icon, setIcon] = useState('emptyHeart')
  const { user, setUser } = useContext(AuthContext)
  const iconStyle = {
    ...(icon === 'heart' && { color: 'tomato' }),
  }
  const heartIcon = {
    emptyHeart: faEmptyHeart,
    heart: faHeart,
  }

  useEffect(() => {
    if (user?.savedRooms.includes(roomId)) {
      setIcon('heart')
    } else {
      setIcon('emptyHeart')
    }
  }, [roomId, user?.savedRooms])

  const updateSaved = async () => {
    if (icon === 'heart') setIcon('emptyHeart')
    else {
      setIcon('heart')
    }
    const res = await updateSavedRooms(user._id, roomId)
    setUser({ ...res.data.user })
  }

  return (
    <>
      {user && (
        <button onClick={updateSaved}>
          <FontAwesomeIcon
            icon={heartIcon[icon]}
            className="text-2xl text-gray-700"
            style={iconStyle}
          />
        </button>
      )}
      {!user && (
        <Link to={PATHS.LOGINPAGE}>
          <FontAwesomeIcon
            icon={heartIcon.emptyHeart}
            className="text-2xl text-gray-700"
          />
        </Link>
      )}
    </>
  )
}
export default SaveRoomButton
