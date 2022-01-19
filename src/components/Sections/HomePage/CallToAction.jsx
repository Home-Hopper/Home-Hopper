import { Link } from 'react-router-dom'
import * as PATHS from '../../../utils/paths'
const CallToAction = () => {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div className="w-9/12 flex flex-col md:flex-row justify-around">
        <div className="flex flex-col items-center md:w-5/12 mb-12 md:mb-0">
          <h3 className="text-2xl md:text-4xl h-24">Need a room?</h3>
          <p className="font-light text-2xl h-24 my-8">
            Search for rooms and save the ones that better suit your needs
          </p>
          <Link
            to={PATHS.SIGNUPPAGE}
            state={{ landlord: false }}
            className="bg-yellow text-purple-dark font-bold py-2 px-6 rounded-lg border-none ml-8 text-xl"
          >
            Register as a tenant
          </Link>
        </div>
        <div className="flex flex-col items-center md:w-5/12 mb-12 md:mb-0">
          <h3 className=" text-2xl md:text-4xl h-24">Got a room to let?</h3>
          <p className="font-light text-2xl h-24 my-8">
            Post a free ad and rent your room in days.
          </p>
          <Link
            to={PATHS.SIGNUPPAGE}
            state={{ landlord: true }}
            className="bg-yellow text-purple-dark font-bold py-2 px-6 rounded-lg border-none ml-8 text-xl"
          >
            Register as a landlord
          </Link>
        </div>
      </div>
    </div>
  )
}
export default CallToAction
