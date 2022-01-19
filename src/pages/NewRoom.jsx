import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRoom } from '../services/rooms.services'
import * as PATHS from '../utils/paths'
import AutoComplete from '../components/AutoComplete/AutoComplete'
import { AuthContext } from '../context/auth.context'

const NewRoom = () => {
  const { user } = useContext(AuthContext)
  const [img, setImg] = useState('')
  const [preview, setPreview] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    isDouble: false,
    bathrooms: 0,
    totalRooms: 0,
    area: 0,
    isAdActive: false,
    isRented: false,
  })
  const {
    title,
    description,
    price,
    isDouble,
    bathrooms,
    totalRooms,
    area,
    isAdActive,
    isRented,
  } = form

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const previewImg = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
  }

  const handleInputChange = async (event) => {
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
    setLoading(true)
    try {
      const formData = new FormData()
      const id = user._id + '_' + Date.now()
      formData.append('file', img)
      formData.append('public_id', id)
      formData.append('upload_preset', 'hhUpload')
      const cloudinaryRes = await axios.post(
        'https://api.cloudinary.com/v1_1/fede4954/image/upload',
        formData
      )

      let roomInfo = {
        ...form,
        image: cloudinaryRes.data.public_id,
        location: locationInput,
        publishedBy: user?._id,
      }

      // successful ROOM CREATION
      await createRoom(roomInfo)
    } catch (err) {
      // unsuccessful room creation
      console.error('Room creating was unsuccessful: ', err)
      return setError({
        message: 'Room creation was unsuccessful! Please check the console.',
      })
    }

    navigate(PATHS.YOURROOMS)
  }

  return (
    <main className="bg-purple-200 flex justify-center">
      <div className="w-11/12 flex flex-col my-6 items-center">
        <h1 className="text-center text-4xl text-purple-dark mb-12">
          Create new room
        </h1>
        <form
          onSubmit={handleFormSubmission}
          className="flex flex-col w-10/12 md:w-2/4 items-center"
        >
          <div className="flex md:flex-row flex-col-reverse justify-between items-center mb-6">
            {preview && (
              <img
                src={preview}
                alt="preview"
                className=" w-96 md:w-1/6 h-auto"
              />
            )}
            <div className="flex flex-col items-center md:w-11/12">
              <label htmlFor="image" className=" mb-4 md:mb-0">
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={(event) => {
                    previewImg(event.target.files[0])
                    setImg(event.target.files[0])
                  }}
                  required
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Room title"
              value={title}
              onChange={handleInputChange}
              className="pl-1 mb-2"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <p>Location:</p>
            <AutoComplete
              locationInput={locationInput}
              setLocationInput={setLocationInput}
              className="pl-1"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Room description"
              value={description}
              onChange={handleInputChange}
              className="pl-1 mb-2 h-28"
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-4 w-full">
            <div className="flex flex-col w-full md:w-1/5">
              <label htmlFor="price">Price (€/month):</label>
              <input
                id="price"
                type="number"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="pl-1 mb-2"
                required
                min="0"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/5">
              <label htmlFor="bathrooms">Nº bathrooms:</label>
              <input
                id="bathrooms"
                type="number"
                name="bathrooms"
                value={bathrooms}
                onChange={handleInputChange}
                className="pl-1 mb-2"
                required
                min="0"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/5">
              <label htmlFor="totalRooms">Nº total rooms:</label>
              <input
                id="totalRooms"
                type="number"
                name="totalRooms"
                value={totalRooms}
                onChange={handleInputChange}
                className="pl-1 mb-2"
                required
                min="0"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/5">
              <label htmlFor="area">Total area (m2):</label>
              <input
                id="area"
                type="number"
                name="area"
                value={area}
                onChange={handleInputChange}
                className="pl-1 mb-2"
                required
                min="0"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between w-full mb-2 ">
            <div className="flex flex-row-reverse md:flex-col w-full items-center justify-end ">
              <label htmlFor="isDouble">Double bedroom</label>
              <input
                id="isDouble"
                type="checkbox"
                name="isDouble"
                value={isDouble}
                onChange={handleInputChange}
                style={{
                  accentColor: '#ffc21c',
                  color: '#470862',
                }}
              />
            </div>

            <div className="flex flex-row-reverse md:flex-col items-center w-full justify-end">
              <label htmlFor="isAdActive">Active ad</label>
              <input
                id="isAdActive"
                type="checkbox"
                name="isAdActive"
                value={isAdActive}
                onChange={handleInputChange}
                style={{
                  accentColor: '#ffc21c',
                  color: '#470862',
                }}
              />
            </div>
            <div className="flex flex-row-reverse md:flex-col items-center w-full justify-end">
              <label htmlFor="isRented">Currently rented</label>
              <input
                id="isRented"
                type="checkbox"
                name="isRented"
                value={isRented}
                onChange={handleInputChange}
                style={{
                  accentColor: '#ffc21c',
                  color: '#470862',
                }}
              />
            </div>
          </div>
          {error && (
            <div className="error-block">
              <p>There was an error submitting the form:</p>
              <p>{error.message}</p>
            </div>
          )}
          <div className="flex justify-center">
            {loading ? (
              <button className="bg-yellow text-purple-dark font-bold py-3 px-12 rounded-lg border-none ml-4">
                Creating room...
              </button>
            ) : (
              <button
                className="bg-yellow text-purple-dark font-bold py-3 px-12 rounded-lg border-none ml-4"
                type="submit"
              >
                Create room
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default NewRoom
