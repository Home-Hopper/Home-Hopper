import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'

const DemoToast = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (!user && localStorage.getItem('demoUserLogin') !== 'closed')
      setIsOpen(true)
  }, [user])

  const manageToast = () => {
    setIsOpen(false)
    localStorage.setItem('demoUserLogin', 'closed')
  }
  return (
    <div
      className={`fixed  w-full sm:w-96 h-24 bg-white shadow-2xl sm:rounded-lg border border-solid border-gray-500  bottom-0 md:bottom-4 right-0 md:right-7   py-4 px-2 z-50 ${
        isOpen ? '' : 'hidden'
      } `}
    >
      <button
        className="absolute top-0 right-4 text-purple-dark font-bold text-xl"
        onClick={manageToast}
      >
        x
      </button>
      <p>Use this user for demo purposes:</p>
      <p className="ml-4">Email: demo@user.com</p>
      <p className="ml-4">Password: Demopassword123</p>
    </div>
  )
}
export default DemoToast
