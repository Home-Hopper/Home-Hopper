import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { updateRoom } from '../../services/rooms.services'
import axios from 'axios'
import AutoComplete from '../AutoComplete/AutoComplete'

const UpdateRoomModal = ({
  isOpen,
  closeModal,
  room,
  needRefresh,
  setNeedRefresh,
}) => {
  const [locationInput, setLocationInput] = useState(room?.location)
  const [newImg, setNewImg] = useState(null)
  const [newPreview, setNewPreview] = useState('')
  const { user } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(false)

  const [form, setForm] = useState({
    title: room?.title,
    location: room?.location,
    description: room?.description,
    price: room?.price,
    isDouble: room?.isDouble,
    bathrooms: room?.bathrooms,
    totalRooms: room?.totalRooms,
    area: room?.area,
    isAdActive: room?.isAdActive,
    isRented: room?.isRented,
  })

  const previewImg = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setNewPreview(reader.result)
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    let val = null
    if (event.target.type === 'checkbox') {
      val = event.target.checked
    } else {
      val = value
    }
    return setForm({ ...form, [name]: val })
  }

  const handleFormSubmission = async (event) => {
    event.preventDefault()
    setUpdating(true)

    try {
      let cloudinaryRes
      if (newImg) {
        const formData = new FormData()
        const id = user._id + '_' + Date.now()
        formData.append('file', newImg)
        formData.append('public_id', id)
        formData.append('upload_preset', 'hhUpload')
        cloudinaryRes = await axios.post(
          'https://api.cloudinary.com/v1_1/home-hopper/image/upload',
          formData
        )
      }

      const roomInfo = {
        ...form,
        location: locationInput,
        roomId: room?._id,
        oldImg: room?.image,
        ...(cloudinaryRes && { newImg: cloudinaryRes.data.public_id }),
      }

      // Succesful room update
      await updateRoom(roomInfo)
      setUpdating(false)

      setNeedRefresh(!needRefresh)
    } catch (err) {
      // Unsuccesful room update
      console.error('Room update was unsuccessful: ', err)
      return setError({
        message: 'Room update was unsuccessful! Please check the console.',
      })
    }
  }

  if (!room) return null
  let backgroundVisible
  if (isOpen) {
    backgroundVisible = {
      visibility: 'visible',
    }
  } else {
    backgroundVisible = {
      visibility: 'hidden',
    }
  }

  return (
    <div
      className="absolute bg-gray-800 opacity-75 top-0 bottom-0 right-0 left-0"
      style={backgroundVisible}
    >
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 py-16 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Update room
                </Dialog.Title>
                <form
                  onSubmit={handleFormSubmission}
                  className="room__form flex flex-col w-2/4 mx-auto"
                >
                  <div className="flex md:flex-row flex-col-reverse justify-between items-center mb-6">
                    <div className="flex flex-col items-center md:w-11/12">
                      <label htmlFor="image" className=" mb-4 md:mb-0">
                        <input
                          id="image"
                          className=" p-1.5 mb-1"
                          type="file"
                          name="image"
                          onChange={(event) => {
                            previewImg(event.target.files[0])
                            setNewImg(event.target.files[0])
                          }}
                          required
                        />
                      </label>
                      {newPreview && <img src={newPreview} alt="preview" />}
                    </div>
                  </div>

                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    className="border-2 border-gray-500 p-1.5 mb-1"
                    type="text"
                    name="title"
                    placeholder="Room title"
                    onChange={handleInputChange}
                    defaultValue={room?.title}
                    required
                  />

                  <h3>Current location: {room?.location}</h3>
                  <div className="border-2 border-gray-500 p-1.5 mb-1">
                    <AutoComplete
                      locationInput={locationInput}
                      setLocationInput={setLocationInput}
                    />
                  </div>

                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    className="border-2 border-gray-500 p-1.5 mb-1 h-28"
                    name="description"
                    placeholder={room?.description}
                    onChange={handleInputChange}
                  ></textarea>

                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    className="border-2 border-gray-500 p-1.5 mb-1"
                    type="number"
                    name="price"
                    onChange={handleInputChange}
                    defaultValue={room?.price}
                    required
                    min="0"
                  />

                  <label htmlFor="isDouble">Double bedroom?</label>
                  <input
                    id="isDouble"
                    type="checkbox"
                    name="isDouble"
                    onChange={handleInputChange}
                    defaultChecked={room?.isDouble}
                  />

                  <label htmlFor="bathrooms">Nº bathrooms:</label>
                  <input
                    id="bathrooms"
                    className="border-2 border-gray-500 p-1.5 mb-1"
                    type="number"
                    name="bathrooms"
                    onChange={handleInputChange}
                    required
                    defaultValue={room?.bathrooms}
                    min="0"
                  />

                  <label htmlFor="totalRooms">Nº total rooms:</label>
                  <input
                    id="totalRooms"
                    className="border-2 border-gray-500 p-1.5 mb-1"
                    type="number"
                    name="totalRooms"
                    onChange={handleInputChange}
                    required
                    defaultValue={room?.totalRooms}
                    min="0"
                  />

                  <label htmlFor="area">Total area (m2):</label>
                  <input
                    id="area"
                    className="border-2 border-gray-500 p-1.5 mb-1"
                    type="number"
                    name="area"
                    onChange={handleInputChange}
                    required
                    defaultValue={room?.area}
                    min="0"
                  />
                  <label htmlFor="isAdActive">Active ad</label>
                  <input
                    id="isAdActive"
                    className="p-1.5 mb-1"
                    type="checkbox"
                    name="isAdActive"
                    onChange={handleInputChange}
                    defaultChecked={room?.isAdActive}
                  />
                  <label htmlFor="isRented">Currently rented</label>
                  <input
                    id="isRented"
                    className="p-1.5 mb-1"
                    type="checkbox"
                    name="isRented"
                    onChange={handleInputChange}
                    defaultChecked={room?.isRented}
                  />

                  {error && (
                    <div className="error-block">
                      <p>There was an error submiting the form:</p>
                      <p>{error.message}</p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-row justify-center my-5">
                    {updating ? (
                      <button className=" px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                        Updating room...
                      </button>
                    ) : (
                      <button
                        type="button"
                        className=" px-4 py-2 text-sm font-bold text-purple-dark bg-yellow border border-transparent rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={(event) => {
                          handleFormSubmission(event)
                          closeModal()
                        }}
                      >
                        Update this room
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default UpdateRoomModal
