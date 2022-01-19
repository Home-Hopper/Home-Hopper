import { Image } from 'cloudinary-react'
import { useState, useContext, useEffect } from 'react'
import { updateProfile } from '../services/profile.services'
import { AuthContext } from '../context/auth.context'
import { getSavedRooms } from '../services/profile.services'
import LoadingComponent from '../components/Loading'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, setUser } = useContext(AuthContext)

  const [form, setForm] = useState({
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    phone: user.phone,
  })

  const [error, setError] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  useEffect(() => {
    const loadSavedRooms = async () => {
      const res = await getSavedRooms(user._id)
      setRooms(res.data)
      setLoading(false)
    }
    loadSavedRooms()
  }, [user._id])

  const handleInputChange = async (event) => {
    const { name, value } = event.target
    return setForm({ ...form, [name]: value })
  }

  const handleFormSubmission = async (event) => {
    setUpdating(true)
    event.preventDefault()
    const credentials = { ...form, userId: user._id }
    const res = await updateProfile(credentials)
    setUser(res.data)
    setUpdating(false)
    if (!res.status) {
      console.error('Signup was unsuccessful: ', res)
      return setError({
        message: 'Signup was unsuccessful! Please check the console.',
      })
    }
  }

  return (
    <main className="bg-purple-200 flex md:flex-row flex-col justify-between pt-12 px-6">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className=" w-full md:w-2/5 mb-8 md:mb-0 flex flex-col items-center">
            <h1 className="text-purple-dark text-4xl mb-4">
              Hello {user.name}!
            </h1>
            <p className="text-gray-700 text-xl mb-8">
              Yo can update your profile information below:
            </p>
            <div className="bg-white rounded-lg flex justify-center py-6 w-full">
              <form
                onSubmit={handleFormSubmission}
                className="flex flex-col items-center mx-4 md:px-0"
              >
                <div className="mb-4 w-72 flex justify-end">
                  <label htmlFor="name" className="mr-2 text-right">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="outline border-2 border-gray-500 pl-1"
                    defaultValue={user.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4 w-72 flex justify-end">
                  <label htmlFor="lastName" className="mr-2 text-right">
                    Last name:{' '}
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    className="outline border-2 border-gray-500 pl-1"
                    defaultValue={user.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4 w-72 flex justify-end">
                  <label htmlFor="email" className="mr-2 text-right">
                    Email:{' '}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your email "
                    className="outline border-2 border-gray-500 pl-1"
                    defaultValue={user.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4 w-72 flex justify-end">
                  <label htmlFor="phone" className="mr-2 text-right">
                    Phone:{' '}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    className="outline border-2 border-gray-500 pl-1"
                    defaultValue={user.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {error && (
                  <div className="error-block">
                    <p>There was an error updating your profile:</p>
                    <p>{error.message}</p>
                  </div>
                )}
                {updating ? (
                  <button className="bg-yellow text-purple-dark font-bold py-2 px-4 rounded-xl border-none ml-4">
                    Updating your profile...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-yellow text-purple-dark font-bold py-2 px-4 rounded-lg border-none ml-4"
                  >
                    Update your profile
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className=" w-full md:w-2/5 items-center">
            <h1 className="text-purple-dark text-4xl mb-4 text-center">
              Saved rooms:
            </h1>
            {rooms?.map((room, index) => {
              return (
                <Link to={`/for-rent/${room._id}`}>
                  <div
                    key={index + Date.now()}
                    className="w-full my-7 rounded-xl flex shadow-md bg-white  items-end"
                  >
                    <Image
                      cloudName="fede4954"
                      publicId={room.image}
                      className="h-24 w-32 object-cover  rounded-l-xl mr-6"
                    />
                    <div className="flex flex-col justify-center my-2">
                      <span className="text-gray-400 text-lg text-left font-bold">
                        {room.price} €/month
                      </span>
                      <span className="text-sm text-left text-gray-700">
                        {room.isDouble ? 'Double bedroom' : 'Single bedroom'}
                      </span>
                      <div className="overflow-y-hidden overflow-ellipsis flex items-center">
                        <span className="tex-lg overflow-x-hidden fade1 text-left ">
                          {room.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}

export default Profile
