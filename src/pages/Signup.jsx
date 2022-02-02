import { useState } from 'react'
import { signup } from '../services/auth.services'
import { Link, useLocation } from 'react-router-dom'
import * as PATHS from '../utils/paths'
import * as USER_HELPERS from '../utils/userToken'

const Signup = () => {
  const location = useLocation()
  let registerAsLandlord
  if (location.state === null) registerAsLandlord = undefined
  else registerAsLandlord = location.state.landlord
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    phone: '',
    isLandlord: false,
  })
  const { email, password, name, lastName, phone, isLandlord } = form

  const [error, setError] = useState(null)

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
    const credentials = {
      email,
      password,
      name,
      lastName,
      phone,
      isLandlord,
    }
    const res = await signup(credentials)
    if (!res.status) {
      // unsuccessful signup
      console.error('Signup was unsuccessful: ', res)
      return setError({
        message: res.errorMessage,
      })
    }
    // successful signup
    USER_HELPERS.setUserToken(res.data.accessToken)
    window.location.assign(PATHS.HOMEPAGE)
  }

  return (
    <div className="flex flex-col justify-center items-center bg-purple-200">
      <div className="bg-white p-10 rounded my-10 w-2/3 lg:w-2/3 xl:w-2/4">
        <h1 className="text-3xl pb-5 font-semibold">Sign Up</h1>
        <hr className="pb-5" />

        <form
          onSubmit={handleFormSubmission}
          className="auth__form flex flex-col pb-5"
        >
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              className="border-2 border-gray-500 p-1.5 mb-1"
              type="email"
              name="email"
              placeholder="jane.doe@gmail.com"
              value={email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              className="border-2 border-gray-500 p-1.5 mb-1"
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={handleInputChange}
              required
              minLength="8"
            />

            <label htmlFor="input-name">Name</label>
            <input
              id="input-name"
              className="border-2 border-gray-500 p-1.5 mb-1"
              type="text"
              name="name"
              placeholder="Jane"
              value={name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="input-lastName">Last name</label>
            <input
              id="input-lastName"
              className="border-2 border-gray-500 p-1.5 mb-1"
              type="text"
              name="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="input-phone">Phone</label>
            <input
              id="input-phone"
              className="border-2 border-gray-500 p-1.5 mb-1"
              type="tel"
              name="phone"
              placeholder="633001122"
              value={phone}
              onChange={handleInputChange}
              required
            />

            {(registerAsLandlord || registerAsLandlord === undefined) && (
              <>
                <label htmlFor="input-isLandlord">Are you a Landlord?</label>
                <input
                  id="input-isLandlord"
                  className="border-2 border-gray-500 p-1.5 mb-1"
                  type="checkbox"
                  name="isLandlord"
                  value={isLandlord}
                  checked={registerAsLandlord}
                  onChange={handleInputChange}
                />
              </>
            )}

            {error && (
              <>
                <div className="error-block text-red-600">
                  <p>{error.message}</p>
                </div>
              </>
            )}
          </div>
          <button
            className="button__submit bg-yellow rounded-lg p-1.5 my-3.5 w-24"
            type="submit"
          >
            <span className="text-purple-dark font-bold">Submit</span>
          </button>
        </form>
        <hr className="pb-5" />

        <p>
          Already a member?{' '}
          <Link
            to={PATHS.LOGINPAGE}
            className="text-purple-dark font-semibold underline p-1.5"
          >
            Log in now!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
