import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouseUser,
  faSearch,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'

const Features = () => {
  return (
    <div className="flex flex-col items-center bg-purple-dark text-white pb-40 text-center">
      <h2 className="py-10 mb-20 text-5xl">How it works?</h2>
      <div className="flex flex-col md:flex-row  w-full md:w-11/12  items-center justify-around">
        <div className="flex flex-col items-center w-11/12s md:w-3/12 mb-12 md:mb-0">
          <FontAwesomeIcon icon={faSearch} className="text-6xl mb-12" />
          <h3 className="text-3xl">Search for rooms in +2.000 cities</h3>
        </div>
        <div className="flex flex-col items-center w-11/12 md:w-3/12 mb-8 md:mb-0">
          <FontAwesomeIcon icon={faHeart} className="text-6xl mb-12" />
          <h3 className="text-3xl">
            Fall in love with the perfect one for you
          </h3>
        </div>
        <div className="flex flex-col items-center w-11/12 md:w-3/12 mb-8 md:mb-0">
          <FontAwesomeIcon icon={faHouseUser} className="text-6xl mb-12" />
          <h3 className="text-3xl">
            Contact the landlord and start enjoining your home
          </h3>
        </div>
      </div>
    </div>
  )
}
export default Features
