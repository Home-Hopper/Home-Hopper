import { useContext, useState } from 'react'
import { Link as NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import * as PATHS from '../../utils/paths'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user, handleLogout } = useContext(AuthContext)

  const handleClick = () => {
    setShowMobileMenu((val) => !val)
  }

  return (
    <>
      <nav className="bg-white top-0 left-0 right-0 sticky z-50 shadow-md">
        <div className="w-11/12 mx-auto ">
          {/* Web header */}
          <div className="flex justify-between">
            {/* Left container */}
            <div className="flex space-x-4">
              {/* Logo */}
              <div>
                <NavLink
                  to={PATHS.HOMEPAGE}
                  className="flex items-end pr-2 text-gray-700 hover:text-gray-900"
                >
                  <img
                    src="/images/logo.png"
                    className="h-12"
                    alt="Home Hopper logo"
                  />
                  <span className="text-purple-light-background font-extrabold text-xl mb-1">
                    Home Hopper
                  </span>
                </NavLink>
              </div>
              {/* Left navbar */}
              <div className="hidden md:flex items-end space-x-1">
                <NavLink
                  to={PATHS.HOMEPAGE}
                  className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                >
                  Home
                </NavLink>
                <NavLink
                  to={PATHS.FORRENT}
                  className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                >
                  For rent
                </NavLink>
                {user && (
                  <>
                    {user.isLandlord && (
                      <NavLink
                        to={PATHS.YOURROOMS}
                        className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                      >
                        Your rooms
                      </NavLink>
                    )}

                    <NavLink
                      to={PATHS.PROFILE}
                      className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                    >
                      Profile
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            {/* Right navbar */}
            {user ? (
              <>
                <div className="hidden md:flex items-end space-x-1">
                  <button
                    className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-end space-x-1">
                  <NavLink
                    to={PATHS.SIGNUPPAGE}
                    className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    to={PATHS.LOGINPAGE}
                    className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                  >
                    Log In
                  </NavLink>
                </div>
              </>
            )}
            {/* Mobile btn */}
            <div className="md:hidden flex items-center">
              <button onClick={handleClick} className="mobile-menu-button">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {showMobileMenu && (
          <div className="md:hidden flex flex-col">
            <>
              <NavLink
                to={PATHS.HOMEPAGE}
                className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
              >
                Home
              </NavLink>
              <NavLink
                to={PATHS.FORRENT}
                className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
              >
                For rent
              </NavLink>
            </>
            {user ? (
              <>
                {user.isLandlord && (
                  <NavLink
                    to={PATHS.YOURROOMS}
                    className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                  >
                    Your rooms
                  </NavLink>
                )}
                <NavLink
                  to={PATHS.PROFILE}
                  className="py-5 px-3 text-gray-light hover:text-purple-light-background hover:underline"
                >
                  Profile
                </NavLink>
                <button
                  className="py-5 px-3 text-gray-light hover:text-purple-light-background text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={PATHS.SIGNUPPAGE}
                  className=" py-5 px-3 text-gray-light hover:text-purple-light-background block"
                >
                  Signup
                </NavLink>
                <NavLink
                  to={PATHS.LOGINPAGE}
                  className="  py-5 px-3 text-gray-light hover:text-purple-light-background"
                >
                  Log In
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
