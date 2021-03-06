import React, { useState } from 'react'
import { login } from '../services/auth.services'
import { Link } from 'react-router-dom'
import './Signup'
import * as PATHS from '../utils/paths'
import * as USER_HELPERS from '../utils/userToken'


const LogIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const { email, password } = form
  const [error, setError] = useState(null)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    return setForm({ ...form, [name]: value })
  }

  const handleFormSubmission = async (event) => {
    event.preventDefault()
    const credentials = {
      email,
      password,
    }
    const res = await login(credentials)
    if (!res.status) {
      return setError({ message: 'Invalid credentials' })
    }
    USER_HELPERS.setUserToken(res.data.accessToken)
    window.location.assign(PATHS.HOMEPAGE)
  }

  return (
    <div className="flex flex-col justify-center items-center bg-purple-200">
      <div className="bg-white p-10 rounded">
        <h1 className="text-3xl pb-5 font-semibold">Log In</h1>
        <hr className="pb-5" />
        <form
          onSubmit={handleFormSubmission}
          className="signup__form flex flex-col pb-5"
        >
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            className="border-2 border-gray-500 p-1.5 mb-1"
            type="text"
            name="email"
            placeholder="demo@user.com"
            value={email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            className="border-2 border-gray-500 p-1.5 mb-4"
            type="password"
            name="password"
            placeholder="Demopassword123"
            value={password}
            onChange={handleInputChange}
            required
            minLength="8"
          />

          {error && (
            <>
                <div className="error-block text-red-600">
                  <p>{error.message}</p>
                </div>
              </>
          )}

          <button
            className="button__submit bg-yellow rounded-lg p-1.5 w-24"
            type="submit"
          >
            <span className="text-purple-dark font-bold">Submit</span>
          </button>
        </form>

        <hr className="p-1.5" />

        <p>
          New to Home Hopper?{' '}
          <Link
            to={PATHS.SIGNUPPAGE}
            className="text-purple-dark font-semibold underline p-1.5"
          >
            Sign up now!
          </Link>
        </p>
      </div>
    </div>
  )
}
export default LogIn
