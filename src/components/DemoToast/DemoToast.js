import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'

const DemoToast = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (!user && localStorage.getItem('toast') !== 'closed') setIsOpen(true)
  }, [user])

  const manageToast = () => {
    setIsOpen(false)
    localStorage.setItem('toast', 'closed')
  }
  return (
    <div
      className={`h-screen w-screen top-0 fixed z-50 ${isOpen ? '' : 'hidden'}`}
    >
      <div className="bg-white shadow-2xl md:rounded-lg border border-solid border-gray-500 w-full md:w-96 h-24 absolute  bottom-0 md:bottom-4 right-0 md:right-7 py-4 px-2">
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
    </div>
  )
}
export default DemoToast
