import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import HomeSearchLocations from '../../HomeSearchLocation/HomeSearchLocation'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [searchParams, setSearchParams] = useState('')
  useEffect(() => {
    fetch('/api')
  }, [])
  return (
    <div
      style={{
        backgroundImage: `url("/images/city-hero-img.jpg")`,
      }}
      className="bg-cover bg-bottom h-screen flex justify-center flex-col items-center relative"
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-purple-dark to-transparent"></div>
      <h1 className="lg:text-7xl md:text-5xl text-4xl  text-white font-bold z-10 px-12">
        Find the right home for you
      </h1>
      <div className="w-9/12 z-10 flex justify-center mt-8">
        <div className="border-none bg-white flex flex-grow justify-items-start items-center rounded-lg px-2 py-2">
          <FontAwesomeIcon icon={faSearchLocation} className="mr-4" />
          <HomeSearchLocations setSearchParams={setSearchParams} />
        </div>
        <Link
          to={`/for-rent?${searchParams}`}
          className="bg-yellow text-purple-dark font-bold py-2 px-4 rounded-lg border-none ml-4"
        >
          Search
        </Link>
      </div>
    </div>
  )
}
export default Hero
